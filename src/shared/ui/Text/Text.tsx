import type { FC, PropsWithChildren } from "react";
import style from "./Text.module.scss";

type TextSize = "big" | "medium" | "small";
type TextColor = "black" | "dark";
type TextAlign = "left" | "center" | "right";

interface TextProps {
  size?: TextSize;
  color?: TextColor;
  align?: TextAlign;
}

const sizeStyles: { [key in TextSize]: string } = {
  big: style.Big,
  medium: style.Medium,
  small: style.Small,
};

const colorStyles: { [key in TextColor]: string } = {
  black: style.Black,
  dark: style.Dark,
};

const alignStyles: { [key in TextAlign]: string } = {
  left: style.Left,
  center: style.Center,
  right: style.Right,
};

const Text: FC<PropsWithChildren<TextProps>> = ({ size = "medium", color = "black", align = "left", children }) => {
  const className = [sizeStyles[size], colorStyles[color], alignStyles[align]].join(" ");

  return <p className={className}>{children}</p>;
};

export default Text;
