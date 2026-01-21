import type { FC } from "react";
import style from "./Icon.module.scss";

type IconType = "delete" | "edit";
type IconSize = "small" | "medium" | "large";

interface IconProps {
  type: IconType;
  size?: IconSize;
}

const sizeStyles: { [key in IconSize]: string } = {
  small: style.Small,
  medium: style.Medium,
  large: style.Large,
};

const Icon: FC<IconProps> = ({ type, size = "medium" }) => {
  const iconClassName = [sizeStyles[size], "material-symbols-outlined"].join(" ");

  return <span className={iconClassName}>{type}</span>;
};

export default Icon;
