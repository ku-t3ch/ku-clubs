import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const Band: NextPage<Props> = () => {
  return (
    <Link href="/" className="flex flex-col">
      <div className="text-[2.25rem] font-bold leading-8">
        KU <span className="text-blue-400">Clubs</span>
      </div>
      <div className="text-gray-400">สำรวจชมรม ในมหาวิทยาลัยเกษตรศาสตร์</div>
    </Link>
  );
};

export default Band;
