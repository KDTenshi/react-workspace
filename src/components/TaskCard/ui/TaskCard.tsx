import { type FC } from "react";
import style from "./TaskCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { useSortable } from "@dnd-kit/sortable";
import type { TTaskPriority } from "../../../shared/types/types";
import { setSelectedTaskID } from "../../../shared/store/tasksSlice";
import { getDateString } from "../../../shared/utils/getDateString";

interface TaskCardProps {
  taskID: string;
  boardID: string;
}

const priorityStyles: { [key in TTaskPriority]: string } = {
  low: style.Low,
  moderate: style.Moderate,
  high: style.High,
};

const TaskCard: FC<TaskCardProps> = ({ taskID, boardID }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id: taskID, data: { type: "task" } });
  const task = useAppSelector((state) => state.tasks.boards[boardID].tasks[taskID]);

  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    dispatch(setSelectedTaskID({ taskID }));
  };

  return (
    <div className={style.Task} {...attributes} {...listeners} ref={setNodeRef} onClick={handleEditClick}>
      <div className={style.Content}>
        <div className={style.Info}>
          <h2 className={style.Title}>{task.title}</h2>
          <p className={priorityStyles[task.priority]}>{task.priority}</p>
        </div>
      </div>
      <p className={style.Date}>{getDateString(task.date)}</p>
    </div>
  );
};

export default TaskCard;
