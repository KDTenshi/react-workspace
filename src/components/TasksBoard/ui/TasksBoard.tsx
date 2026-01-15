import type { FC } from "react";
import style from "./TasksBoard.module.scss";
import { TasksColumn } from "../../TasksColumn";

const TasksBoard: FC = () => {
  return (
    <div className={style.Board}>
      <TasksColumn type={"todo"} />
      <TasksColumn type={"doing"} />
      <TasksColumn type={"done"} />
    </div>
  );
};

export default TasksBoard;
