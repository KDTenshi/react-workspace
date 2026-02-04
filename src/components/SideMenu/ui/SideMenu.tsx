import type { FC } from "react";
import style from "./SideMenu.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { Link } from "react-router";
import Button from "../../../shared/ui/Button/Button";
import { showBoardPopup } from "../../../shared/store/uiSlice";
import Text from "../../../shared/ui/Text/Text";

const SideMenu: FC = () => {
  const boards = useAppSelector((state) => state.tasks.boards);
  const dispatch = useAppDispatch();

  const boardsArray = Object.values(boards);

  const handleAddBoardClick = () => {
    dispatch(showBoardPopup());
  };

  return (
    <div className={style.Menu}>
      <div className={style.Head}>
        <Text size="big" color="dark">
          Your boards
        </Text>
        <Button size={"medium"} onClick={handleAddBoardClick}>
          Add
        </Button>
      </div>
      <nav className={style.Boards}>
        {boardsArray.length === 0 && (
          <Text size="medium" color="dark" align="center">
            No boards
          </Text>
        )}
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
