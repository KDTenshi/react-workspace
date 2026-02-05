import type { FC, PropsWithChildren } from "react";
import style from "./Text.module.scss";
import type { StylesUnion } from "../../types/types";

type TextSize = "big" | "medium" | "small";
type TextColor = "black" | "dark";
type TextAlign = "left" | "center" | "right";

interface TextProps {
  size?: TextSize;
  color?: TextColor;
  align?: TextAlign;
}

const sizeStyles: StylesUnion<TextSize> = {
  big: style.Big,
  medium: style.Medium,
  small: style.Small,
};

const colorStyles: StylesUnion<TextColor> = {
  black: style.Black,
  dark: style.Dark,
};

const alignStyles: StylesUnion<TextAlign> = {
  left: style.Left,
  center: style.Center,
  right: style.Right,
};

const Text: FC<PropsWithChildren<TextProps>> = ({ size = "medium", color = "black", align = "left", children }) => {
  const className = [sizeStyles[size], colorStyles[color], alignStyles[align]].join(" ");

  return <p className={className}>{children}</p>;
};

export default Text;
