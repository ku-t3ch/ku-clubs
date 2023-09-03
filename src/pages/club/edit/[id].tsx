import EditClubDetail from "@/components/ClubEdit/EditClubDetail";
import EditClubEditor from "@/components/ClubEdit/EditClubEditor";
import EditClubSetting from "@/components/ClubEdit/EditClubSetting";
import BackButton from "@/components/common/BackButton";
import ClubNotFound from "@/components/common/ClubNotFound";
import { Button } from "@/components/form/Button";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import checkCanEdit from "@/utils/checkCanEdit";
import { Campus, Club, ClubType } from "@prisma/client";
import { Tabs } from "antd";
import { NextPage, NextPageContext } from "next";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { NextRequest } from "next/server";
import { useState } from "react";
import toast from "react-hot-toast";

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.query;

  const token = await getToken({
    req: ctx.req as unknown as NextRequest,
    secret: process.env.SECRET,
  });

  let checkCanEditBoolean = await checkCanEdit(id as string, token?.email as string);

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
      owner: {
        select: {
          id: true,
          email: true,
        },
      },
      editor: {
        select: {
          email: true,
        },
      },
    },
  });

  return {
    props: {
      id,
      clubData: checkCanEditBoolean ? JSON.parse(JSON.stringify(clubData)) || null : null,
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
        owner: {
          id: string;
          email: string | null;
        };
        editor: {
          email: string | null;
        }[];
      })
    | null;
}

const Add: NextPage<Props> = ({ id, clubData }) => {
  const { data: session } = useSession();
  
  if (!clubData) {
    return <ClubNotFound />;
  }

  const deleteClubApi = api.club.deleteClub.useMutation();

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

  const TabList = [
    {
      key: "1",
      label: "แก้ไขขรายละเอียด",
      children: <EditClubDetail clubData={clubData} id={id} />,
      editorAccess: true,
      ownerAccess: true,
    },
    {
      key: "2",
      label: "สิทธิ์การแก้ไข",
      children: <EditClubEditor clubData={clubData} id={id} />,
      editorAccess: false,
      ownerAccess: true,
    },
    {
      key: "3",
      label: "ตั้งค่า",
      children: <EditClubSetting clubData={clubData} id={id} />,
      editorAccess: true,
      ownerAccess: true,
    },
  ];

  const isOwner = session?.user.email === clubData.owner.email;

  const TabListFinal = TabList.filter((tab) => {
    if (isOwner) {
      return tab.ownerAccess;
    } else {
      return tab.editorAccess;
    }
  });

  return (
    <>
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-3 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BackButton className="hidden md:flex" />
            <div className="text-3xl font-bold">แก้ไขชมรม</div>
          </div>
          {isOwner && (
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
          )}
        </div>
        <div className="flex gap-5">
          <Tabs className="w-full" defaultActiveKey="1" type="card" items={TabListFinal} />
        </div>
      </div>
    </>
  );
};

export default Add;
