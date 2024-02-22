import { Button } from "../form/Button";
import { Form } from "antd";
import Label from "../form/Label";
import { PropsInterface } from "./PropsInterface";
import { useState } from "react";
import { Input } from "../form/Input";
import { api } from "@/utils/api";

export default function EditManagementTeam(props: PropsInterface) {
    const managementTeamApi = api.club.updateMenageTeam.useMutation();
    const [FormObject, setFormObject] = useState({
        treasurer: props.clubData?.treasurer?.email ?? "",
        secretary: props.clubData?.secretary?.email ?? "",
        vice_president: props.clubData?.vice_president?.email ?? "",
        president: props.clubData?.president?.email ?? ""
    });
    const onSubmit = async () => {
        managementTeamApi.mutate({
            clubId: props.id,
            president: FormObject.president,
        });
    };
    return (
        <div className="flex flex-col gap-x-5 md:flex-row w-full">
            <Form
                onFinish={onSubmit}
                layout="vertical"
                className="relative flex w-full flex-col rounded-md "
            >
                <Form.Item label={<Label isRequire>ประธานชมรม</Label>}>
                    <Input
                        value={FormObject.president ?? ""}
                        onChange={(e) => {
                            setFormObject(pre => (
                                {
                                    ...pre,
                                    president: e.target.value
                                }
                            ));
                        }}
                        type={"text"}
                    />
                </Form.Item>
                <Form.Item label={<Label isRequire>รองประธานชมรม</Label>}>
                    <Input
                        value={FormObject.vice_president ?? ""}
                        onChange={(e) => {
                            setFormObject(pre => (
                                {
                                    ...pre,
                                    vice_president: e.target.value
                                }
                            ));
                        }}
                        type={"text"}
                    />
                </Form.Item>
                <Form.Item label={<Label isRequire>เลขานุการชมรม</Label>}>
                    <Input
                        value={FormObject.secretary ?? ""}
                        onChange={(e) => {
                            setFormObject(pre => (
                                {
                                    ...pre,
                                    secretary: e.target.value
                                }
                            ));
                        }}
                        type={"text"}
                    />
                </Form.Item>
                <Form.Item label={<Label isRequire>เหรัญญิกชมรม</Label>}>
                    <Input
                        value={FormObject.treasurer ?? ""}
                        onChange={(e) => {
                            setFormObject(pre => (
                                {
                                    ...pre,
                                    treasurer: e.target.value
                                }
                            ));
                        }}
                        type={"text"}
                    />
                </Form.Item>
            </Form>
            <div className="relative w-full flex-col gap-7 md:flex md:w-1/6">
                <div className="sticky top-5 flex flex-col gap-3">
                    <Button onClick={onSubmit} color="primary" size="large" className="w-full">
                        Save
                    </Button>

                </div>
            </div>

        </div>
    )
}