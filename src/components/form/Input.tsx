import { clsx } from "clsx";
import { CSSProperties, ChangeEvent, FC, Ref } from "react";

interface Props {
  size?: "small" | "medium" | "large";
  outline?: boolean;
  type: "text" | "password";
  ref?: Ref<HTMLInputElement>;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  css?: CSSProperties;
  className?: string;
  error?: string;
}

const Input: FC<Props> = ({
  size,
  outline,
  type,
  ref,
  value,
  onChange,
  placeholder,
  css,
  className,
  error
}) => {
  let styled = ["rounded-[.5rem] focus:outline-blue-400 shadow-sm"];

  if (outline) {
    styled.push("border border-[#D1D5DB]");
  } else {
    styled.push("bg-gray-100 drop-shadow-sm");
  }

  if (!size) {
    size = "medium";
  }

  switch (size) {
    case "small":
      styled.push("text-[.75rem] p-[.4rem]");
      break;
    case "medium":
      styled.push("text-[.8rem] p-[.6rem]");
      break;
    case "large":
      styled.push("text-[.85rem] p-[.8em]");
      break;
  }

  return (
    <>
      <input
        type={type}
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={css}
        className={clsx(styled, className)}
      />
      {error && <span className="text-red-500">{error}</span>}
    </>
  );
};

export { Input };
