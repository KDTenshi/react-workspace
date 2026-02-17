import type { FC } from "react";
import { RecentBoards } from "../../../components/RecentBoards";
import style from "./HomePage.module.scss";
import { Welcome } from "../../../components/Welcome";

const HomePage: FC = () => {
  return (
    <div className={style.Page}>
      <Welcome />
      <RecentBoards />
    </div>
  );
};

export default HomePage;
