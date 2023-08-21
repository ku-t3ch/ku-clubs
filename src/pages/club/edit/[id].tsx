import BackButton from "@/components/common/BackButton";
import ClubNotFound from "@/components/common/ClubNotFound";
import { Button } from "@/components/form/Button";
import { Input } from "@/components/form/Input";
import Label from "@/components/form/Label";
import RichTextEditor from "@/components/form/RichTextEditor";
import Select from "@/components/form/Select";
import UploadFile from "@/components/form/UploadFile";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { Icon } from "@iconify/react";
import { Campus, Club, ClubType } from "@prisma/client";
import { Form } from "antd";
import { NextPage, NextPageContext } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface FormBody {
  name: string;
  detail: string;
  campus: {
    value: string;
    label: string;
  };
  clubType: {
    value: string;
    label: string;
  }[];
  logo: string;
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.query;

  const clubData = await prisma.club.findUnique({
    where: {
      id: id as string,
    },
    include: {
      campus: true,
      likes: {
        select: {
          likeId: true,
        },
      },
      type: true,
    },
  });

  return {
    props: {
      id,
      clubData: JSON.parse(JSON.stringify(clubData)) || null,
    },
  };
}

interface Props {
  id: string | null;
  clubData:
    | (Club & {
        campus: Campus;
        type: ClubType[];
        likes: {
          likeId: string | null;
        }[];
      })
    | null;
}

const Add: NextPage<Props> = ({ id, clubData }) => {
  if (!clubData) {
    return <ClubNotFound />;
  }

  const campusApi = api.campus.getAllCampuses.useQuery();
  const clubTypeApi = api.clubtype.getAllClubTypes.useQuery();
  const deleteClubApi = api.club.deleteClub.useMutation();
  const updateClub = api.club.updateClub.useMutation();
  const [IsPreview, setIsPreview] = useState(false);

  const [FormBody, setFormBody] = useState<FormBody>({
    name: clubData.name,
    detail: clubData.detail,
    campus: {
      value: clubData.campus.id,
      label: clubData.campus.name,
    },
    clubType: clubData.type.map((type) => ({
      value: type.id,
      label: type.name,
    })),
    logo: "",
  } as unknown as FormBody);

  const [Error, setError] = useState({
    name: undefined as undefined | string,
    detail: undefined as undefined | string,
    campus: undefined as undefined | string,
    clubType: undefined as undefined | string,
    logo: undefined as undefined | string,
  });

  useEffect(() => {
    (async () => {
      const base64 = await imageUrlToBase64(clubData.logo);
      setFormBody((pre) => ({
        ...pre,
        logo: base64 as string,
      }));
    })();
  }, [clubData.logo]);

  const onSubmit = async () => {
    if (checkIsError()) {
      return;
    }

    let toastKey = toast.loading("กำลังบันทึกข้อมูล");

    await updateClub.mutateAsync(
      {
        id: id as string,
        name: FormBody.name,
        detail: FormBody.detail,
        campusId: FormBody.campus.value,
        clubType: FormBody.clubType.map((c) => c.value) as string[],
        logo: FormBody.logo,
      },
      {
        onSuccess: () => {
          toast.success("บันทึกข้อมูลสำเร็จ", {
            id: toastKey,
          });
        },
        onError: (err) => {
          toast.error(err.message, {
            id: toastKey,
          });
        },
      }
    );
  };

  const onHandlePreview = () => {
    setIsPreview((pre) => !pre);
  };

  const checkIsError = () => {
    let isError = false;

    setError({
      name: undefined,
      detail: undefined,
      campus: undefined,
      clubType: undefined,
      logo: undefined,
    });

    if (FormBody.name === "") {
      setError((pre) => ({
        ...pre,
        name: "กรุณากรอกชื่อชมรม",
      }));
      isError = true;
    }
    if (FormBody.detail === "") {
      setError((pre) => ({
        ...pre,
        detail: "กรุณากรอกรายละเอียด",
      }));
      isError = true;
    }
    if (FormBody.campus.value === "") {
      setError((pre) => ({
        ...pre,
        campus: "กรุณาเลือกวิทยาเขต",
      }));
      isError = true;
    }
    if (FormBody.clubType.length === 0) {
      setError((pre) => ({
        ...pre,
        clubType: "กรุณาเลือกประเภทชมรม",
      }));
      isError = true;
    }
    if (FormBody.logo === "") {
      setError((pre) => ({
        ...pre,
        logo: "กรุณาเลือกรูปภาพชมรม",
      }));
      isError = true;
    }

    return isError;
  };

  const imageUrlToBase64 = (url: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        let canvas = document.createElement("CANVAS") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        canvas.height = img.height;
        canvas.width = img.width;
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
        canvas = null as any;
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = url;
    });
  };

  const onDelete = async () => {
    let toastKey = toast.loading("กำลังลบข้อมูล");

    await deleteClubApi.mutateAsync(clubData.id, {
      onSuccess: () => {
        toast.success("ลบข้อมูลสำเร็จ", {
          id: toastKey,
        });
        window.location.href = "/my-clubs";
      },
      onError: (err) => {
        toast.error(err.message, {
          id: toastKey,
        });
      },
    });
    window.location.href = "/my-clubs";
  };

  return (
    <>
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-3 py-3">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">เพิ่มชมรม</div>
          <div className="flex gap-1">
            <Button
              onClick={onDelete}
              color="secondary"
              size="medium"
              className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </Button>
            <Button
              onClick={onHandlePreview}
              color="secondary"
              size="medium"
              className="flex items-center gap-2"
            >
              {IsPreview ? (
                <>
                  <Icon icon="material-symbols:edit-outline-sharp" className="text-xl" />
                  <div className="hidden md:block">Editor</div>
                </>
              ) : (
                <>
                  <Icon icon="material-symbols:visibility-outline" className="text-xl" />{" "}
                  <div className="hidden md:block">Preview</div>
                </>
              )}
            </Button>

            <Button
              onClick={onSubmit}
              color="secondary"
              size="medium"
              className="flex items-center gap-2"
            >
              Save
            </Button>
          </div>
        </div>
        <div className="flex gap-5">
          <Form
            onFinish={onSubmit}
            layout="vertical"
            className="relative flex w-full flex-col rounded-md border p-5"
          >
            <Form.Item label={<Label isRequire>รูปภาพชมรม</Label>}>
              <img
                src={FormBody.logo}
                alt="logo"
                className="mb-3 h-28 w-28 rounded-2xl object-cover"
                style={{
                  objectPosition: "center",
                }}
              />
              <UploadFile
                onUpload={(c) => {
                  setFormBody((pre) => ({
                    ...pre,
                    logo: c[0] as string,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label={<Label isRequire>ชื่อชมรม</Label>}>
              <Input
                onChange={(e) =>
                  setFormBody((pre) => ({
                    ...pre,
                    name: e.target.value,
                  }))
                }
                value={FormBody.name}
                placeholder="ชื่อชมรม"
                type={"text"}
                className="w-full"
                size="large"
                error={Error.name}
              />
            </Form.Item>
            <Form.Item label={<Label isRequire>ประเภทชมรม</Label>}>
              {clubTypeApi.data && (
                <Select
                  options={clubTypeApi.data.map((type) => ({
                    value: type.id,
                    label: type.name,
                  }))}
                  value={FormBody.clubType}
                  isMulti
                  onChange={(e: any) => {
                    setFormBody((pre) => ({
                      ...pre,
                      clubType: e.map((c: any) => {
                        console.log({
                          value: c.value,
                          label: c.label,
                        });

                        return {
                          value: c.value,
                          label: c.label,
                        };
                      }),
                    }));
                  }}
                  error={Error.clubType}
                />
              )}
            </Form.Item>
            <Form.Item label={<Label isRequire>รายละเอียด</Label>}>
              <RichTextEditor
                initialValue={FormBody.detail}
                onChange={(c) =>
                  setFormBody((pre) => ({
                    ...pre,
                    detail: c,
                  }))
                }
                error={Error.detail}
              />
            </Form.Item>
            <Form.Item label={<Label isRequire>เลือกวิทยาเขต</Label>}>
              {campusApi.data && (
                <Select
                  options={campusApi.data.map((campus) => ({
                    value: campus.id,
                    label: campus.name,
                  }))}
                  value={[FormBody.campus]}
                  onChange={(e: any) =>
                    setFormBody((pre) => ({
                      ...pre,
                      campus: {
                        value: e.value,
                        label: e.label,
                      },
                    }))
                  }
                  error={Error.campus}
                />
              )}
            </Form.Item>
          </Form>
          <div className="hidden w-1/3 flex-col gap-7 md:flex">
            <div className="flex flex-col gap-2">
              <b className="text-xl">การเลือกประเภทชมรม</b>
              <p>ควรเลือกประเภทชมรมให้ถูกต้อง และเหมาะสมกับชมรม</p>
            </div>
            <div className="flex flex-col gap-2">
              <b className="text-xl">การเขียนรายละเอียด</b>
              <p>ควรเขียนรายละเอียดให้ครบถ้วน และเข้าใจง่าย โดยไม่ต้องใช้คำศัพท์ที่ซับซ้อน</p>
            </div>
            <div className="flex flex-col gap-2">
              <b className="text-xl">การเลือกวิทยาเขต</b>
              <p>ควรเลือกวิทยาเขตให้ถูกต้อง ตรงกับวิทยาเขตที่เราตั้งชมรม</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
