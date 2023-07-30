import clsx from "clsx";
import { NextPage } from "next";
import tw from "tailwind-styled-components";

interface Props {
  children: React.ReactNode;
  isRequire?: boolean;
  size?: "small" | "medium" | "large";
}

const Label: NextPage<Props> = ({ children, isRequire, size = "medium" }) => {
  let styled = [];

  switch (size) {
    case "small":
      styled.push("text-sm");
      break;
    case "medium":
      styled.push("text-lg");
      break;
    case "large":
      styled.push("text-xl");
      break;
  }

  const LabelCss = tw.div<{ $isRequire?: boolean }>`
    ${(p) => (p.$isRequire ? "before:content-['*']  before:text-red-500" : "")}
    font-bold
`;

  return <LabelCss className={clsx(styled)} $isRequire={isRequire}>{children}</LabelCss>;
};

export default Label;
