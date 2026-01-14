import type { FC } from "react";
import style from "./TasksColumn.module.scss";
import { TaskCard } from "../../TaskCard";

const TasksColumn: FC = () => {
  return (
    <div className={style.Column}>
      <h2 className={style.Title}>Column</h2>
      <div className={style.Tasks}>
        {/* <p className={style.Empty}>No tasks here yet</p> */}
        <TaskCard />
      </div>
    </div>
  );
};

export default TasksColumn;
