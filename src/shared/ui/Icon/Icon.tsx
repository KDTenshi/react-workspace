import type { FC } from "react";
import style from "./Icon.module.scss";
import type { StylesUnion } from "../../types/types";

type IconType = "delete" | "edit";
type IconSize = "small" | "medium" | "large";

interface IconProps {
  type: IconType;
  size?: IconSize;
}

const sizeStyles: StylesUnion<IconSize> = {
  small: style.Small,
  medium: style.Medium,
  large: style.Large,
};

const Icon: FC<IconProps> = ({ type, size = "medium" }) => {
  const iconClassName = [sizeStyles[size], "material-symbols-outlined"].join(" ");

  return <span className={iconClassName}>{type}</span>;
};

export default Icon;
