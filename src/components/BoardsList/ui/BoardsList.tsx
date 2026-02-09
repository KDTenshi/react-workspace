import type { FC } from "react";
import style from "./BoardsList.module.scss";
import { useAppSelector } from "../../../app/store/appStore";
import { Link } from "react-router";
import Text from "../../../shared/ui/Text/Text";

const BoardsList: FC = () => {
  const boards = useAppSelector((state) => state.tasks.boards);

  const boardsArray = Object.values(boards);

  return (
    <nav className={style.Wrapper}>
      {boardsArray.length === 0 && (
        <Text size="big" color="dark" align="center">
          No boards here
        </Text>
      )}

      {boardsArray.length !== 0 && (
        <div className={style.List}>
          {boardsArray.map((board) => (
            <Link to={`/boards/${board.id}`} className={style.Link} key={board.id}>
              <Text size="big" color="dark">
                {board.title}
              </Text>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default BoardsList;
