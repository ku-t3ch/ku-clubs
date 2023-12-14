import EditClubEditor from "@/components/ClubEdit/EditClubEditor";
import EditClubSetting from "@/components/ClubEdit/EditClubSetting";
import ClubNotFound from "@/components/common/ClubNotFound";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import checkCanEdit from "@/utils/checkCanEdit";
import { Campus, Club, ClubType } from "@prisma/client";
import { Button, Modal } from "antd";
import { NextPage, NextPageContext } from "next";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import { NextRequest } from "next/server";
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

const Publish: NextPage<Props> = ({ id, clubData }) => {
    const deleteClubApi = api.club.deleteClub.useMutation()
    const { push } = useRouter()

    if (!clubData) {
        return <ClubNotFound />;
    }

    const onDeleteClub = async () => {
        Modal.confirm({
            title: "ลบชมรม",
            content: <div className="text-red-500">คุณแน่ใจหรือไม่ที่จะลบชมรมนี้ออกจากระบบ ลบแล้วจะไม่สามารถกู้คืนได้ รวมถึงข้อมูลอีเว้นท์และข่าวสารทั้งหมด</div>,
            okText: "ลบชมรม",
            cancelText: "ยกเลิก",
            onOk: () => {
                const key = toast.loading("กำลังลบชมรม");
                deleteClubApi.mutate(id!, {
                    onSuccess: () => {
                        toast.success("ลบชมรมสำเร็จ", { id: key });
                        push("/my-clubs");
                    },
                    onError: (err) => {
                        toast.error("เกิดข้อผิดพลาดในการลบชมรม", { id: key });
                    }
                })
            },
        });


    }

    return (
        <>
            <div className="mx-auto flex max-w-6xl flex-col gap-5 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="text-3xl font-bold">ตั้งค่า</div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                    <div className="flex justify-between max-w-md items-center">
                        <div className="flex flex-col">
                            <div className="text-lg">ลบชมรม</div>
                            <div className="text-sm text-gray-400">ลบชมรมออกจากระบบ</div>
                        </div>
                        <Button onClick={onDeleteClub} loading={deleteClubApi.isLoading} danger type="primary">ลบชมรม</Button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Publish;
