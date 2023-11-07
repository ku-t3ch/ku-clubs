import { clsx } from "clsx";
import Link from "next/link";
import { CSSProperties, FC, ReactNode } from "react";

interface Props {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error";
  outline?: boolean;
  className?: string;
  css?: CSSProperties;
  onClick?: () => void;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  href?: string;
  loading?: boolean;
}

const Button: FC<Props> = ({
  size,
  color,
  outline,
  css,
  className,
  onClick,
  children,
  type,
  href,
  loading,
}) => {
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
    case "secondary":
      if (!outline) {
        styled.push("text-black bg-gray-200 hover:bg-gray-300");
      } else {
        styled.push(
          "text-gray-400 border-gray-400 hover:text-gray-500 hover:border-gray-500 bg-gray-50"
        );
      }
      break;
    case "error":
      if (!outline) {
        styled.push("text-white bg-red-500 hover:bg-red-600 ");
      } else {
        styled.push(
          "text-red-500 border-red-500 hover:text-red-600 hover:border-red-600 bg-red-50"
        );
      }
      break;
    default:
  }

  return href ? (
    <Link href={href} style={css} className={clsx(styled, className)} type={type}>
      {loading ? "loading..." : children}
    </Link>
  ) : (
    <button onClick={onClick} style={css} className={clsx(styled, className)} type={type}>
      {loading ? "loading..." : children}
    </button>
  );
};

export { Button };
