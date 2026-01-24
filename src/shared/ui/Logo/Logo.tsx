import type { FC } from "react";
import { Link } from "react-router";
import style from "./Logo.module.scss";

const Logo: FC = () => {
  return (
    <Link to={"/"} className={style.Logo}>
      Workspace
    </Link>
  );
};

export default Logo;
