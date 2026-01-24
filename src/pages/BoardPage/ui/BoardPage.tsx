import type { FC } from "react";
import { TasksBoard } from "../../../components/TasksBoard";
import { useParams } from "react-router";
import { TaskPopup } from "../../../components/TaskPopup";
import { useAppSelector } from "../../../app/store/appStore";

const BoardPage: FC = () => {
  const { boardID } = useParams();
  const isTaskPopupShown = useAppSelector((state) => state.ui.isTaskPopupShown);
  const selectedTaskID = useAppSelector((state) => state.tasks.selectedTaskID);

  if (!boardID) return;

  return (
    <>
      <TasksBoard boardID={boardID} />
      {isTaskPopupShown && <TaskPopup />}
      {selectedTaskID && <TaskPopup editTaskID={selectedTaskID} />}
    </>
  );
};

export default BoardPage;
