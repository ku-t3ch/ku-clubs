import { clsx } from "clsx";
import { CSSProperties, FC, ReactNode } from "react";

interface Props {
  size?: "small" | "medium" | "large";
  color?: "primary";
  outline?: boolean;
  className?: string;
  css?: CSSProperties;
  onClick?: () => void;
  children?: ReactNode;
}

const Button: FC<Props> = ({ size, color, outline, css, className, onClick, children }) => {
  let styled = ["font-semibold cursor-pointer transition-all duration-300 ease-out"];

  // size
  if (!size) size = "medium";

  switch (size) {
    case "small":
      styled.push("text-xs py-1 px-2 rounded-[.4rem]");
      break;
    case "medium":
      styled.push("text-sm py-1.5 px-3 rounded-[.5rem]");
      break;
    case "large":
      styled.push("py-2.5 px-5 rounded-[.6rem]");
      break;
  }

  // color styled

  if (outline) {
    styled.push("border-[.1rem]");
  }

  switch (color) {
    case "primary":
      if (!outline) {
        styled.push("text-white bg-blue-400 hover:bg-blue-500 primary-shadow");
      } else {
        styled.push(
          "text-blue-400 border-blue-400 hover:text-blue-500 hover:border-blue-500 bg-blue-50"
        );
      }
      break;
    default:
  }

  return (
    <button onClick={onClick} style={css} className={clsx(styled, className)}>
      {children}
    </button>
  );
};

export { Button };
