import RenderMarkdown from "@/components/RenderMarkdown";
import BackButton from "@/components/common/BackButton";
import ClubNotFound from "@/components/common/ClubNotFound";
import Stat from "@/components/common/Stat";
import { prisma } from "@/server/db";
import { Campus, Club } from "@prisma/client";
import { sanitize } from "isomorphic-dompurify";
import { NextPage, NextPageContext } from "next";

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
        likes: {
            likeId: string | null;
        }[];
    })
    | null;
}

const Club: NextPage<Props> = ({ clubData }) => {
    if (clubData === null) {
        return <ClubNotFound />;
    }

    let clean = sanitize(clubData.detail);

    return (
        <>
            <div className="z-10 mx-auto flex max-w-6xl flex-col gap-5 px-3 py-3">
                <BackButton />
                <div className="flex flex-col gap-6 md:flex-row md:gap-9">
                    <img
                        className="h-[10rem] w-[10rem] rounded-2xl md:h-[200px] md:w-[200px]"
                        src={clubData.logo}
                        alt={clubData.name}
                    />
                    <div className="flex flex-col justify-center gap-2 md:gap-3">
                        <div className="text-sm"></div>
                        <div className="text-2xl font-bold md:text-4xl">{clubData.name}</div>
                        <Stat
                            {...{
                                likes: clubData.likes.length,
                                views: clubData.views,
                                location: clubData.campus.name,
                            }}
                        />
                    </div>
                </div>
                <hr />
                <RenderMarkdown content={clubData.detail} />
                {/* <div className="prose" dangerouslySetInnerHTML={{ __html: clean }}></div> */}
            </div>
        </>
    );
};

export default Club;
