import type { FC } from "react";
import style from "./TaskCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { useSortable } from "@dnd-kit/sortable";
import type { TTaskPriority } from "../../../shared/types/types";
import { deleteTask, setSelectedTaskID } from "../../../shared/store/tasksSlice";
import { getDateString } from "../../../shared/utils/getDateString";

interface TaskCardProps {
  taskID: string;
}

const priorityStyles: { [key in TTaskPriority]: string } = {
  low: style.Low,
  moderate: style.Moderate,
  high: style.High,
};

const TaskCard: FC<TaskCardProps> = ({ taskID }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id: taskID, data: { type: "task" } });
  const task = useAppSelector((state) => state.tasks.list[taskID]);

  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    dispatch(setSelectedTaskID({ taskID }));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTask({ taskID }));
  };

  return (
    <div className={style.Task} {...attributes} {...listeners} ref={setNodeRef}>
      <div className={style.Content}>
        <div className={style.Info}>
          <h2 className={style.Title}>{task.title}</h2>
          <p className={style.Body}>{task.body}</p>
          <p className={priorityStyles[task.priority]}>{task.priority}</p>
        </div>
        <div className={style.Controls}>
          <button className={style.Button} onClick={handleDeleteClick}>
            DEL
          </button>
          <button className={style.Button} onClick={handleEditClick}>
            EDT
          </button>
        </div>
      </div>
      <p className={style.Date}>{getDateString(task.date)}</p>
    </div>
  );
};

export default TaskCard;
