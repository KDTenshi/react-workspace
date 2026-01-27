import type { FC } from "react";
import style from "./Header.module.scss";
import Logo from "../../../shared/ui/Logo/Logo";

const Header: FC = () => {
  return (
    <header className={style.Header}>
      <Logo />
    </header>
  );
};

export default Header;
