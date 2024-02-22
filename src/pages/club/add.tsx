import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/form/Button";
import { Input } from "@/components/form/Input";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import UploadFile from "@/components/form/UploadFile";
import { api } from "@/utils/api";
import { Form } from "antd";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const RichTextEditor = dynamic(() => import("@/components/form/RichTextEditor"), { ssr: false });

interface FormBody {
  name: string;
  detail: string;
  campus: string;
  clubType: string | string[];
  logo: string;
}

interface Props {}

const Add: NextPage<Props> = () => {
  const campusApi = api.campus.getAllCampuses.useQuery();
  const clubTypeApi = api.clubtype.getAllClubTypes.useQuery();
  const addClubApi = api.club.addClub.useMutation();
  const [IsPreview, setIsPreview] = useState(false);
  const { push } = useRouter();

  const [FormBody, setFormBody] = useState<FormBody>({
    name: "",
    detail: "",
    campus: "",
    clubType: [],
    logo: "",
  } as FormBody);

  const [Error, setError] = useState({
    name: undefined as undefined | string,
    detail: undefined as undefined | string,
    campus: undefined as undefined | string,
    clubType: undefined as undefined | string,
    logo: undefined as undefined | string,
  });

  const onSubmit = async () => {
    if (checkIsError()) {
      return;
    }

    let toastKey = toast.loading("กำลังบันทึกข้อมูล");

    await addClubApi.mutateAsync(
      {
        name: FormBody.name,
        detail: FormBody.detail,
        campusId: FormBody.campus,
        clubType: FormBody.clubType as string[],
        logo: FormBody.logo,
      },
      {
        onSuccess: () => {
          toast.success("บันทึกข้อมูลสำเร็จ", {
            id: toastKey,
          });
          clearForm();
          push("/my-clubs");
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

  const clearForm = () => {
    setFormBody({
      name: "",
      detail: "",
      campus: "",
      clubType: "",
      logo: "",
    });

    setError({
      name: undefined,
      detail: undefined,
      campus: undefined,
      clubType: undefined,
      logo: undefined,
    });
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
    if (FormBody.campus === "") {
      setError((pre) => ({
        ...pre,
        campus: "กรุณาเลือกวิทยาเขต",
      }));
      isError = true;
    }
    if (FormBody.clubType === "" || FormBody.clubType.length === 0) {
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

  return (
    <>
      <div className="mx-auto max-w-6xl flex flex-col gap-5 ">
        <BackButton />
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">เพิ่มชมรม</div>
          {/* <div className="flex gap-1">
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
            <Button color="secondary" size="medium" className="flex items-center gap-2">
              Save Draft
            </Button>
          </div> */}
        </div>
        <div className="flex gap-5">
          <Form
            onFinish={onSubmit}
            layout="vertical"
            className="relative flex w-full flex-col rounded-md border p-5"
          >
            <Form.Item label={<Label isRequire>รูปภาพชมรม</Label>}>
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
                  isMulti
                  onChange={(e: any) =>
                    setFormBody((pre) => ({
                      ...pre,
                      clubType: e.map((c: any) => c.value),
                    }))
                  }
                  error={Error.clubType}
                />
              )}
            </Form.Item>
            <Form.Item label={<Label isRequire>รายละเอียด</Label>}>
              <RichTextEditor
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
                  onChange={(e: any) =>
                    setFormBody((pre) => ({
                      ...pre,
                      campus: e.value,
                    }))
                  }
                  error={Error.campus}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button color="primary" size="large" type="submit">
                บันทึก
              </Button>
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
