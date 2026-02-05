import type { FC, TextareaHTMLAttributes } from "react";
import style from "./Textarea.module.scss";
import type { StylesUnion } from "../../types/types";

type TextareaSize = "big" | "medium" | "small";
type TextareaColor = "light" | "dark";
type TextareaHeight = "long" | "regular" | "short";

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: TextareaSize;
  color?: TextareaColor;
  height?: TextareaHeight;
}

const sizeStyles: StylesUnion<TextareaSize> = {
  big: style.Big,
  medium: style.Medium,
  small: style.Small,
};

const colorStyles: StylesUnion<TextareaColor> = {
  light: style.Light,
  dark: style.Dark,
};

const heightStyles: StylesUnion<TextareaHeight> = {
  long: style.Long,
  regular: style.Regular,
  short: style.Short,
};

const Textarea: FC<TextareaProps> = ({ size = "medium", color = "light", height = "regular", className, ...props }) => {
  const textareaClassName = [sizeStyles[size], colorStyles[color], heightStyles[height], className].join(" ");

  return <textarea className={textareaClassName} {...props}></textarea>;
};

export default Textarea;
