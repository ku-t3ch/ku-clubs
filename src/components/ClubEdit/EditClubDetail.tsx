import { Form } from "antd";
import { NextPage } from "next";
import Label from "../form/Label";
import RichTextEditor from "../form/RichTextEditor";
import Select from "../form/Select";
import { Input } from "../form/Input";
import UploadFile from "../form/UploadFile";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { Campus, Club, ClubType } from "@prisma/client";
import toast from "react-hot-toast";
import { Button } from "../form/Button";
import { useRouter } from "next/router";

interface Props {
    id: string | null;
    clubData:
    | Club & {
        campus: Campus;
        type: ClubType[];
        likes: {
            likeId: string | null;
        }[];
    };
}

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

const EditClubDetail: NextPage<Props> = ({ clubData, id }) => {
    const campusApi = api.campus.getAllCampuses.useQuery();
    const clubTypeApi = api.clubtype.getAllClubTypes.useQuery();
    const { push } = useRouter();
    const updateClub = api.club.updateClub.useMutation();

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

        const toastKey = toast.loading("กำลังบันทึกข้อมูล");

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

    //   const onHandlePreview = () => {
    //     setIsPreview((pre) => !pre);
    //   };

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

    return (
        <div className="flex flex-col gap-x-5 md:flex-row w-full">
            <Form
                onFinish={onSubmit}
                layout="vertical"
                className="relative flex w-full flex-col rounded-md "
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
            <div className="relative w-full flex-col gap-7 md:flex md:w-1/6">
                <div className="sticky top-5 flex flex-col gap-3">
                    <Button loading={updateClub.isLoading} onClick={onSubmit} color="primary" size="large" className="w-full">
                        Save
                    </Button>
                    <Button onClick={()=>push(`/club/${id}`)} color="secondary" size="large" className="w-full">
                        ดูชมรม
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default EditClubDetail;
