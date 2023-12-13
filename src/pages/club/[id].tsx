import BackButton from "@/components/common/BackButton";
import ClubNotFound from "@/components/common/ClubNotFound";
import Stat from "@/components/common/Stat";
import { prisma } from "@/server/db";
import { Campus, Club } from "@prisma/client";
import { sanitize } from "isomorphic-dompurify";
import { NextPage, NextPageContext } from "next";
import { getToken } from "next-auth/jwt";
import { NextSeo } from "next-seo";

export async function getServerSideProps(ctx: NextPageContext) {
    const { id } = ctx.query;

    const token = await getToken({ req: ctx.req as any, secret: process.env.SECRET });

    const clubData = await prisma.club.findUnique({
        where: {
            id: id as string,
        },
        include: {
            campus: true,
            likes: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (clubData) {
        await prisma.club.update({
            where: {
                id: id as string,
            },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
    }

    if (clubData?.approved && clubData.isPublic) {
        return {
            props: {
                id,
                clubData: JSON.parse(JSON.stringify(clubData)) || null,
                clicked: token
                    ? clubData?.likes.filter((user) => user.id! === token?.sub).length > 0
                    : false,
            },
        };
    } else {
        return {
            props: {
                id,
                clubData: null,
                click: false,
            },
        };
    }
}

interface Props {
    id: string | null;
    clubData:
    | (Club & {
        campus: Campus;
        likes: {
            id: string;
        }[];
    })
    | null;
    clicked: boolean;
}

const Club: NextPage<Props> = ({ clubData, clicked }) => {
    if (clubData === null) {
        return <ClubNotFound />;
    }

    let clean = sanitize(clubData.detail);

    const shortDescription = (description: string) => {
        return description.length > 100 ? description.substring(0, 100).replaceAll("\n", "") + "..." : description.replaceAll("\n", "");
    };

    return (
        <>
            <NextSeo
                title={shortDescription(clubData.name)}
                description={shortDescription(clubData.name)}
                openGraph={{
                    title: shortDescription(clubData.name),
                    url: "https://club.tech.nisit.ku.ac.th/club/" + clubData.id,
                    type: "website",
                    description: shortDescription(clubData.name),
                    images: [
                        {
                            url: clubData.logo,
                            alt: `image logo of ${shortDescription(clubData.name)}`,
                        },
                    ],

                    siteName: clubData.name,
                }}
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
            <div className="z-10 mx-auto flex max-w-6xl flex-col gap-5 py-3 w-full">
                <BackButton />
                <div className="flex flex-col gap-6 md:flex-row md:gap-9 w-full">
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
                                clicked: clicked,
                                clubData: clubData,
                                likes: clubData.likes.length,
                                views: clubData.views,
                                location: clubData.campus.name,
                            }}
                        />
                    </div>
                </div>
                <hr />
                <div className="prose" dangerouslySetInnerHTML={{ __html: clean }}></div>
            </div>
        </>
    );
};

export default Club;
