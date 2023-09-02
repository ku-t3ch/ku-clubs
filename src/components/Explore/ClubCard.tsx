import { NextPage } from "next";
import Stat from "../common/Stat";
import Link from "next/link";

interface Props {
  data: {
    logo: string;
    name: string;
    id: string;
    campus: {
      name: string;
    };
    views: number;
  };
}

const ClubCard: NextPage<Props> = ({ data }) => {
  return (
    <Link href={`/club/${data.id}`}>
      <div className="flex max-w-[350px] cursor-pointer gap-3 rounded-[5px] border border-gray-300 p-4 hover:bg-gray-50">
        <img className="h-[75px] w-[75px] rounded-2xl" src={data.logo} alt="" />
        <div className="flex flex-col">
          <div className="font-bold">{data.name}</div>
          <div>
            <Stat size="sm" location={data.campus.name} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ClubCard;
