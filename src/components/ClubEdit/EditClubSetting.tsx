import { type Campus, type Club, type ClubType } from "@prisma/client";
import { NextPage } from "next";
import { Button } from "../form/Button";
import { Form, Switch, Typography } from "antd";
import { api } from "@/utils/api";
import { useState } from "react";
import toast from "react-hot-toast";

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

const EditClubSetting: NextPage<Props> = ({ clubData }) => {
  const [FormObject, setFormObject] = useState({
    isPublic: clubData.isPublic,
    showOnIndex: clubData.showOnIndex,
  });
  const apiSettingClub = api.club.settingClub.useMutation();

  const onSubmit = async () => {
    const key = toast.loading("กำลังบันทึกข้อมูล");
    apiSettingClub.mutate(
      {
        id: clubData.id,
        isPublic: FormObject.isPublic,
        showOnIndex: FormObject.showOnIndex,
      },
      {
        onSuccess: () => {
          toast.success("บันทึกสำเร็จ", { id: key });
        },
        onError: (e) => {
          toast.error(`บันทึกไม่สำเร็จ ${e.message}`, { id: key });
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-x-5 md:flex-row w-full">
      <Form className="flex w-full flex-col gap-x-5 md:flex-row" layout="vertical">
        <Form.Item label="เผยแพร่">
          <Switch
            size="default"
            checked={FormObject.isPublic}
            onChange={(e) => {
              setFormObject({ ...FormObject, isPublic: e });
            }}
          />
        </Form.Item>
        <Form.Item label="แสดงในรายการ">
          <Switch
            size="default"
            checked={FormObject.showOnIndex}
            onChange={(e) => {
              setFormObject({ ...FormObject, showOnIndex: e });
            }}
          />
        </Form.Item>
        <Typography>
          <Typography.Title level={3}>คำอธิบาย</Typography.Title>
          <Typography.Paragraph>
            <Typography.Title level={5}>เผยแพร่</Typography.Title>
            <Typography.Paragraph>
              เป็นการทำให้ชมเป็นสาธารณะ ทุกคนสามารถเข้าถึงได้
            </Typography.Paragraph>
          </Typography.Paragraph>
          <Typography.Paragraph>
            <Typography.Title level={5}>แสดงในรายการ</Typography.Title>
            <Typography.Paragraph>
              แสดงในรายการชมรม หรือรายการผลลัพธ์จากการค้นหา
            </Typography.Paragraph>
          </Typography.Paragraph>
        </Typography>
      </Form>

      <div className="w-full flex-col gap-7 md:flex md:w-1/6">
        <Button
          loading={apiSettingClub.isLoading}
          onClick={onSubmit}
          color="primary"
          size="large"
          className="w-full"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditClubSetting;
