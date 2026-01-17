import type { FC } from "react";
import style from "./TaskCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { useSortable } from "@dnd-kit/sortable";
import type { TTaskPriority } from "../../../shared/types/types";
import { setSelectedTaskID } from "../../../shared/store/tasksSlice";
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
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id: taskID, data: { type: "task" } });
  const task = useAppSelector((state) => state.tasks.list[taskID]);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setSelectedTaskID({ taskID }));
  };

  return (
    <div
      className={style.Task}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={handleClick}
    >
      <h2 className={style.Title}>{task.title}</h2>
      <p className={style.Body}>{task.body}</p>
      <p className={priorityStyles[task.priority]}>{task.priority}</p>
      <p className={style.Date}>{getDateString(task.date)}</p>
    </div>
  );
};

export default TaskCard;
