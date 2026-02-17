import type { FC } from "react";
import style from "./BoardInfo.module.scss";
import { useAppSelector } from "../../../app/store/appStore";
import Heading from "../../../shared/ui/Heading/Heading";
import Text from "../../../shared/ui/Text/Text";
import { Link } from "react-router";

interface BoardInfoProps {
  boardID: string;
}

const BoardInfo: FC<BoardInfoProps> = ({ boardID }) => {
  const board = useAppSelector((state) => state.tasks.boards[boardID]);

  return (
    <div className={style.Info}>
      <Link to={`/boards/${boardID}`} className={style.Link}>
        <Text size="medium" color="dark">
          Go back
        </Text>
      </Link>
      <Heading color="black" level={2}>
        {board.title}
      </Heading>
      <Text size="big" color="dark">
        {board.description}
      </Text>
    </div>
  );
};

export default BoardInfo;
