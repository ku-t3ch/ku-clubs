import BackButton from "@/components/common/BackButton";
import { Typography } from "antd";
import { NextPage } from "next";

interface Props {}

const _404: NextPage<Props> = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Typography.Title>Page Not Found</Typography.Title>
      <BackButton />
    </div>
  );
};

export default _404;
