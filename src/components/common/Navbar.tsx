import { NextPage } from "next";

interface Props {}

const Navbar: NextPage<Props> = () => {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col">
        <div className="text-[2.25rem] font-bold">
          KU <span className="text-blue-400">Clubs</span>
        </div>
        <div className="text-gray-400">สำรวจชมรม ในมหาวิทยาลัยเกษตรศาสตร์</div>
      </div>
    </div>
  );
};

export default Navbar;
