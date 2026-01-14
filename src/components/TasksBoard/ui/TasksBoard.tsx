import type { FC } from "react";
import style from "./TasksBoard.module.scss";
import { TasksColumn } from "../../TasksColumn";

const TasksBoard: FC = () => {
  return (
    <div className={style.Board}>
      <TasksColumn />
      <TasksColumn />
      <TasksColumn />
    </div>
  );
};

export default TasksBoard;
