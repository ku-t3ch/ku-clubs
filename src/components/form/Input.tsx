import { FC, Ref } from "react";

interface Props {
  size?: "small" | "medium" | "large";
  outline?: boolean;
  type: "text" | "password";
  ref?: Ref<HTMLInputElement>;
  value?: string;
  onChange?: () => void;
  placeholder?: string;
  className?: string;
}

const Input: FC<Props> = ({
  size,
  outline,
  type,
  ref,
  value,
  onChange,
  placeholder,
  className,
}) => {
  let styled = "rounded-[.5rem] focus:outline-blue-400";

  if (outline) {
    styled += " border-2 border-[#D1D5DB]";
  } else {
    styled += " bg-gray-100 drop-shadow-sm ";
  }

  switch (size) {
    case "small":
      styled += " text-[.75rem] p-[.55rem]";
      break;
    case "large":
      styled += " text-[.85rem] p-[.65rem]";
      break;
    default:
      styled += " text-[.8rem] p-[.6rem]";
  }

  return (
    <input
      type={type}
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styled} ${className}`}
    />
  );
};

export default Input;
