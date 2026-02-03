import type { FC } from "react";
import { TasksBoard } from "../../../components/TasksBoard";
import { useParams } from "react-router";
import { useAppSelector } from "../../../app/store/appStore";
import { TaskInfoPopup } from "../../../components/TaskInfoPopup";

const BoardPage: FC = () => {
  const { boardID } = useParams();
  const selectedTaskID = useAppSelector((state) => state.tasks.selectedTaskID);

  if (!boardID) return;

  return (
    <>
      <TasksBoard boardID={boardID} />
      {selectedTaskID && <TaskInfoPopup taskID={selectedTaskID} boardID={boardID} />}
    </>
  );
};

export default BoardPage;
