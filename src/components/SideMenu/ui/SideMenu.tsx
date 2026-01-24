import type { FC } from "react";
import style from "./SideMenu.module.scss";
import { useAppSelector } from "../../../app/store/appStore";
import { Link } from "react-router";

const SideMenu: FC = () => {
  const boards = useAppSelector((state) => state.tasks.boards);

  const boardsArray = Object.values(boards);

  return (
    <div className={style.Menu}>
      <p className={style.Text}>Your boards</p>
      <nav className={style.Boards}>
        {boardsArray.length === 0 && <p className={style.Empty}>No boards</p>}
        {boardsArray.map((board) => (
          <Link to={`/board/${board.id}`} key={board.id} className={style.Link}>
            {board.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideMenu;
