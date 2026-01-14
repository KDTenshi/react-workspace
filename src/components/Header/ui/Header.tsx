import type { FC } from "react";
import style from "./Header.module.scss";

const Header: FC = () => {
  return (
    <header className={style.Header}>
      <div className={style.Logo}>Workspace</div>
      <button className={style.Button}>Add task</button>
    </header>
  );
};

export default Header;
