import { Button } from "../form/Button";
import { Form } from "antd";
import Label from "../form/Label";
import { PropsInterface } from "./PropsInterface";

export default function EditManagementTeam(props: PropsInterface) {
    const onSubmit = async () => {
       
    };
    return (
        <div className="flex flex-col gap-x-5 md:flex-row w-full">
            <Form
                onFinish={onSubmit}
                layout="vertical"
                className="relative flex w-full flex-col rounded-md "
            >
                <Form.Item label={<Label isRequire>รูปภาพชมรม</Label>}>
                    
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