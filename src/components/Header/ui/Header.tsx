import type { FC } from "react";
import style from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import Button from "../../../shared/ui/Button/Button";
import { addBoard, setSelectedBoardID } from "../../../shared/store/tasksSlice";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.tasks.boards);

  const handleAddBoardClick = () => {
    dispatch(addBoard());
  };

  const handleBoardClick = (boardID: string) => {
    dispatch(setSelectedBoardID({ boardID }));
  };

  return (
    <header className={style.Header}>
      <div className={style.Logo}>Workspace</div>
      <div className={style.Boards}>
        {Object.values(boards).map((board) => (
          <Button size={"big"} key={board.id} onClick={() => handleBoardClick(board.id)}>
            {board.title}
          </Button>
        ))}
      </div>
      <Button size="big" onClick={handleAddBoardClick}>
        Add Board
      </Button>
    </header>
  );
};

export default Header;
