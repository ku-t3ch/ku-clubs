import { type Campus, type Club, type ClubType } from "@prisma/client";
import { type NextPage } from "next";
import { Button } from "../form/Button";
import { Form } from "antd";
import { Input } from "../form/Input";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { PropsInterface } from "./PropsInterface";


const EditClubEditor: NextPage<PropsInterface> = ({ clubData }) => {
    const clubEditorSettingApi = api.club.settingEditor.useMutation();
    const { data: session } = useSession();
    const [EmailList, setEmailList] = useState<
        {
            id: string;
            email: string;
        }[]
    >(clubData?.editor?.map((e) => ({ id: uuid(), email: e.email! })) || []);

    const handleAddEmail = () => {
        const lastEmpty = EmailList.filter((e) => e.email === "");
        if (lastEmpty.length > 0) {
            return;
        }
        setEmailList((pre) => [...pre, { id: uuid(), email: "" }]);
    };

    const handleDeleteEmail = (id: string) => {
        setEmailList((pre) => pre.filter((e) => e.id !== id));
    };

    const isOwner = session?.user.email === clubData?.owner?.email;

    const handleSave = async () => {
        if (!clubData) {
            return;
        }
        const notiId = toast.loading("กำลังบันทึกข้อมูล");
        await clubEditorSettingApi.mutate(
            {
                id: clubData?.id,
                emailList: EmailList.map((e) => e.email),
            },
            {
                onSuccess: () => {
                    toast.success("บันทึกข้อมูลสำเร็จ", {
                        id: notiId,
                    });
                },
                onError: (err) => {
                    toast.error(`บันทึกข้อมูลไม่สำเร็จ ${err.message}`, {
                        id: notiId,
                    });
                },
            }
        );
    };

    return (
        <div className="flex flex-col gap-x-5 md:flex-row w-full">
            <Form layout="vertical" className="relative flex w-full flex-col rounded-md ">
                <div className="flex justify-between">
                    <div className="mb-5 text-xl font-bold">Owner is {clubData?.owner?.email}</div>
                </div>
                <Form.Item label={isOwner ? `เพิ่ม email สำหรับผู้แก้ไข` : `email สำหรับผู้แก้ไข`}>
                    <div className="flex flex-col gap-2">
                        {isOwner
                            ? EmailList.map((email) => (
                                <div className="flex w-full gap-2" key={email.id}>
                                    <Input
                                        value={email.email}
                                        onChange={(e) => {
                                            setEmailList((pre) =>
                                                pre.map((d1) => {
                                                    if (d1.id === email.id) {
                                                        return {
                                                            ...d1,
                                                            email: e.target.value,
                                                        };
                                                    }
                                                    return d1;
                                                })
                                            );
                                        }}
                                        type={"text"}
                                    />
                                    <Button onClick={() => handleDeleteEmail(email.id)} type="button" color="error">
                                        ลบ
                                    </Button>
                                </div>
                            ))
                            : EmailList.map((email) => (
                                <div className="flex w-full gap-2" key={email.id}>
                                    <Input value={email.email} disabled type={"text"} />
                                </div>
                            ))}
                        {isOwner && (
                            <Button onClick={handleAddEmail} type="button" color="secondary" className="w-fit">
                                เพิ่ม
                            </Button>
                        )}
                    </div>
                </Form.Item>
            </Form>
            {isOwner && <div className="w-full flex-col gap-7 md:flex md:w-1/6">
                <Button
                    loading={clubEditorSettingApi.isLoading}
                    onClick={handleSave}
                    color="primary"
                    size="large"
                    className="w-full"
                >
                    Save
                </Button>
            </div>}

        </div>
    );
};

export default EditClubEditor;
