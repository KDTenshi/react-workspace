import type { FC, InputHTMLAttributes } from "react";
import style from "./Input.module.scss";
import type { StylesUnion } from "../../types/types";

type InputColor = "light" | "dark";
type InputSize = "big" | "medium" | "small";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  color?: InputColor;
  size?: InputSize;
}

const colorStyles: StylesUnion<InputColor> = {
  light: style.Light,
  dark: style.Dark,
};

const sizeStyles: StylesUnion<InputSize> = {
  big: style.Big,
  medium: style.Medium,
  small: style.SMall,
};

const Input: FC<InputProps> = ({ color = "light", size = "medium", className, type = "text", ...props }) => {
  const inputClassName = [colorStyles[color], sizeStyles[size], className].join(" ");

  return <input className={inputClassName} type={type} {...props} />;
};

export default Input;
