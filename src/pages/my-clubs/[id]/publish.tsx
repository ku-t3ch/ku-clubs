import EditClubEditor from "@/components/ClubEdit/EditClubEditor";
import EditClubSetting from "@/components/ClubEdit/EditClubSetting";
import ClubNotFound from "@/components/common/ClubNotFound";
import { prisma } from "@/server/db";
import checkCanEdit from "@/utils/checkCanEdit";
import { Campus, Club, ClubType } from "@prisma/client";
import { NextPage, NextPageContext } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

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

    if (!clubData) {
        return <ClubNotFound />;
    }

    return (
        <>
            <div className="mx-auto flex max-w-6xl flex-col gap-5 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="text-3xl font-bold">เผยแผร่</div>
                    </div>
                </div>
                <div className="flex gap-5 w-full">
                    <EditClubSetting clubData={clubData} id={id} />
                </div>
            </div>
        </>
    );
};

export default Publish;
