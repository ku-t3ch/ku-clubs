import { NextPage } from "next";
import { Button } from "../form/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import clsx from "clsx";

interface Props {
  className?: string;
  href?: string;
}

const BackButton: NextPage<Props> = ({ className, href }) => {
  const { back, push } = useRouter();
  return (
    <Button
      onClick={() => (!href ? back() : push(href))}
      className={clsx("flex w-fit gap-1", className)}
      color="secondary"
    >
      <Icon icon="eva:arrow-back-fill" className="text-xl" />
      กลับ
    </Button>
  );
};

export default BackButton;
