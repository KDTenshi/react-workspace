import type { FC } from "react";
import style from "./TaskCard.module.scss";
import { useAppSelector } from "../../../app/store/appStore";

interface TaskCardProps {
  taskID: string;
}

const TaskCard: FC<TaskCardProps> = ({ taskID }) => {
  const task = useAppSelector((state) => state.tasks.list[taskID]);

  return (
    <div className={style.Task}>
      <h2 className={style.Title}>{task.title}</h2>
      <p className={style.Body}>{task.body}</p>
      <p className={style.Date}>{task.date}</p>
    </div>
  );
};

export default TaskCard;
