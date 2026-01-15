import type { FC } from "react";
import style from "./Header.module.scss";
import { useAppDispatch } from "../../../app/store/appStore";
import { showForm } from "../../../shared/store/tasksSlice";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  const handleAddTaskClick = () => {
    dispatch(showForm());
  };

  return (
    <header className={style.Header}>
      <div className={style.Logo}>Workspace</div>
      <button className={style.Button} onClick={handleAddTaskClick}>
        Add task
      </button>
    </header>
  );
};

export default Header;
