import { NextPage } from "next";
import BackButton from "./BackButton";

interface Props {}

const ClubNotFound: NextPage<Props> = () => {
  return (
    <>
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-3 py-3">
        <div className="flex flex-col justify-between gap-5">
          <BackButton />
          <div className="flex justify-center">
            <div className="text-3xl font-bold">ไม่พบชมรมที่คุณต้องการ</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubNotFound;
