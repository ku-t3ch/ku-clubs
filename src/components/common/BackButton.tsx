import { NextPage } from "next";
import { Button } from "../form/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

interface Props {}

const BackButton: NextPage<Props> = () => {
  const { back } = useRouter();
  return (
    <Button onClick={() => back()} className="flex w-fit gap-1" color="secondary">
      <Icon icon="eva:arrow-back-fill" className="text-xl" />
      กลับ
    </Button>
  );
};

export default BackButton;
