import { NextPage } from "next";
import Stat from "../common/Stat";
import Link from "next/link";

interface Props {
    data: {
        campus: {
            name: string;
        };
        name: string;
        logo: string;
        id: string;
        views: number;
        likes: number;
        canlike?: boolean;
    };
}

const ClubCard: NextPage<Props> = ({ data }) => {
    return (
        <Link href={`/club/${data.id}`}>
            <div className="flex w-[350px] cursor-pointer gap-3 rounded-[5px] border border-gray-300 p-4 hover:bg-gray-50">
                <img className="h-[75px] w-[75px] rounded-2xl" src={data.logo} alt="" />
                <div className="flex flex-col">
                    <div className="font-bold">{data.name}</div>
                    <div>
                        <Stat canlike={data.canlike} size="sm" location={data.campus.name} views={data.views} likes={data.likes} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ClubCard;
