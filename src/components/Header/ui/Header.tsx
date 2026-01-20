import type { FC } from "react";
import style from "./Header.module.scss";
import { useAppDispatch } from "../../../app/store/appStore";
import { showTaskPopup } from "../../../shared/store/uiSlice";
import Button from "../../../shared/ui/Button/Button";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  const handleAddTaskClick = () => {
    dispatch(showTaskPopup());
  };

  return (
    <header className={style.Header}>
      <div className={style.Logo}>Workspace</div>
      <Button size="big" onClick={handleAddTaskClick}>
        Add task
      </Button>
    </header>
  );
};

export default Header;
