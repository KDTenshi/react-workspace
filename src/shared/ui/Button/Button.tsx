import type { ButtonHTMLAttributes, FC } from "react";
import style from "./Button.module.scss";
import type { StylesUnion } from "../../types/types";

type ButtonSize = "small" | "medium" | "big";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
}

const sizeStyles: StylesUnion<ButtonSize> = {
  small: style.Small,
  medium: style.Medium,
  big: style.Big,
};

const Button: FC<ButtonProps> = ({ size = "medium", className, ...props }) => {
  const buttonClassName = [sizeStyles[size], className].join(" ");

  return <button className={buttonClassName} {...props}></button>;
};

export default Button;
