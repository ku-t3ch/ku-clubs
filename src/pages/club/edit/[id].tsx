import EditClubDetail from "@/components/ClubEdit/EditClubDetail";
import EditClubEditor from "@/components/ClubEdit/EditClubEditor";
import EditClubSetting from "@/components/ClubEdit/EditClubSetting";
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
import { Form, Tabs } from "antd";
import { NextPage, NextPageContext } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  const deleteClubApi = api.club.deleteClub.useMutation();
  const [IsPreview, setIsPreview] = useState(false);

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
          <div className="flex items-center gap-2">
            <BackButton className="hidden md:flex" />
            <div className="text-3xl font-bold">แก้ไขชมรม</div>
          </div>
          <div className="flex gap-1">
            <Button
              onClick={onDelete}
              color="secondary"
              size="medium"
              className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </div>
        <div className="flex gap-5">
          <Tabs
            className="w-full"
            defaultActiveKey="1"
            type="card"
            items={[
              {
                key: "1",
                label: "แก้ไขขรายละเอียด",
                children: <EditClubDetail clubData={clubData} id={id} />,
              },
              {
                key: "2",
                label: "สิทธิ์การแก้ไข",
                children: <EditClubEditor clubData={clubData} id={id} />,
              },
              {
                key: "3",
                label: "ตั้งค่า",
                children: <EditClubSetting clubData={clubData} id={id} />
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Add;
