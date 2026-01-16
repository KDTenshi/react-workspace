import type { FC } from "react";
import style from "./TaskCard.module.scss";
import { useAppSelector } from "../../../app/store/appStore";
import { useSortable } from "@dnd-kit/sortable";

interface TaskCardProps {
  taskID: string;
}

const TaskCard: FC<TaskCardProps> = ({ taskID }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id: taskID, data: { type: "task" } });
  const task = useAppSelector((state) => state.tasks.list[taskID]);

  return (
    <div
      className={style.Task}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h2 className={style.Title}>{task.title}</h2>
      <p className={style.Body}>{task.body}</p>
      <p className={style.Date}>{task.date}</p>
    </div>
  );
};

export default TaskCard;
