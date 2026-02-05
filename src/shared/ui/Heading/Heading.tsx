import type { FC, PropsWithChildren } from "react";
import style from "./Heading.module.scss";
import type { StylesUnion } from "../../types/types";

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingColor = "black" | "dark";

interface HeadingProps {
  level?: HeadingLevel;
  color?: HeadingColor;
}

const colorStyles: StylesUnion<HeadingColor> = {
  black: style.Black,
  dark: style.Dark,
};

const levelStyles: StylesUnion<HeadingLevel> = {
  1: style.Heading_1,
  2: style.Heading_2,
  3: style.Heading_3,
  4: style.Heading_4,
};

const Heading: FC<PropsWithChildren<HeadingProps>> = ({ level = 1, color = "black", children }) => {
  const className = [levelStyles[level], colorStyles[color]].join(" ");

  switch (level) {
    case 1: {
      return <h1 className={className}>{children}</h1>;
    }
    case 2: {
      return <h2 className={className}>{children}</h2>;
    }
    case 3: {
      return <h3 className={className}>{children}</h3>;
    }
    case 4: {
      return <h4 className={className}>{children}</h4>;
    }
    default: {
      return <h1 className={className}>{children}</h1>;
    }
  }
};

export default Heading;
