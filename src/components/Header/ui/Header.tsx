import type { FC } from "react";
import style from "./Header.module.scss";
import { useAppDispatch } from "../../../app/store/appStore";
import Button from "../../../shared/ui/Button/Button";
import { addBoard } from "../../../shared/store/tasksSlice";
import Logo from "../../../shared/ui/Logo/Logo";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  const handleAddBoardClick = () => {
    dispatch(addBoard());
  };

  return (
    <header className={style.Header}>
      <Logo />
      <Button size="big" onClick={handleAddBoardClick}>
        Add Board
      </Button>
    </header>
  );
};

export default Header;
