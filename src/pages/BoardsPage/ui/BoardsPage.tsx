import type { FC } from "react";
import Heading from "../../../shared/ui/Heading/Heading";
import style from "./BoardsPage.module.scss";
import { BoardsList } from "../../../components/BoardsList";

const BoardsPage: FC = () => {
  return (
    <div className={style.Page}>
      <Heading level={2} color="black">
        Your boards
      </Heading>
      <BoardsList />
    </div>
  );
};

export default BoardsPage;
