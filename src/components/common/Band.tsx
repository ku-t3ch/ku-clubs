import { NextPage } from "next";

interface Props {}

const Band: NextPage<Props> = () => {
  return (
    <div className="flex flex-col">
      <div className="text-[2.25rem] font-bold leading-8">
        KU <span className="text-blue-400">Clubs</span>
      </div>
      <div className="text-gray-400">สำรวจชมรม ในมหาวิทยาลัยเกษตรศาสตร์</div>
    </div>
  );
};

export default Band;
