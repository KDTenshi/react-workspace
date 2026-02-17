import type { FC } from "react";
import { useParams } from "react-router";
import { BoardInfo } from "../../../components/BoardInfo";

const BoardInfoPage: FC = () => {
  const { boardID } = useParams();

  if (!boardID) return;

  return <BoardInfo boardID={boardID} />;
};

export default BoardInfoPage;
