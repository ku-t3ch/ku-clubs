import { NextPage } from "next";
import ReactSelect, { CSSObjectWithLabel } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface Props {
  onChange?: (content: Option) => void;
  isMulti?: boolean;
  placeholder?: string;
  styles?: CSSObjectWithLabel;
  options: Array<Option>;
}

const Select: NextPage<Props> = (props) => {
  return (
    <ReactSelect
      options={props.options}
      isMulti={props.isMulti || false}
      onChange={(e) => props.onChange && props.onChange(e as any)}
      className="z-10"
      placeholder={props.placeholder || "Select..."}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          ...props.styles,
          borderColor: state.isFocused ? "#5FA5F9" : "#ffffff",
          borderRadius: ".5rem",
          backgroundColor: "#F3F4F6",
          borderWidth: "2px",
          boxShadow: "none",
        }),
      }}
    />
  );
};

export default Select;
