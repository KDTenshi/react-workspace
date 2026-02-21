import type { FC } from "react";
import style from "./BoardHead.module.scss";
import Heading from "./../../../shared/ui/Heading/Heading";
import { Link } from "react-router";
import Text from "../../../shared/ui/Text/Text";
import Button from "../../../shared/ui/Button/Button";
import type { TBoard } from "../../../shared/types/types";

interface BoardHeadProps {
  board: TBoard;
  page: "tasks" | "info";
}

const BoardHead: FC<BoardHeadProps> = ({ board, page }) => {
  return (
    <div className={style.Head}>
      <div className={style.Info}>
        <Heading level={3} color="black">
          {board.title}
        </Heading>
      </div>
      <div className={style.Controls}>
        <nav className={style.Links}>
          <Link to={`/boards/${board.id}`} className={style.Link}>
            <Text size="medium" color="dark">
              Tasks
            </Text>
          </Link>
          <Link to={`/boards/${board.id}/info`} className={style.Link}>
            <Text size="medium" color="dark">
              Board details
            </Text>
          </Link>
        </nav>
        {page === "info" && <Button size="medium">Delete</Button>}
        {page === "tasks" && <Button size="medium">Add task</Button>}
      </div>
    </div>
  );
};

export default BoardHead;
