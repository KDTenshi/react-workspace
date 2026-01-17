import type { FC } from "react";
import style from "./TaskInfo.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { setSelectedTaskID } from "../../../shared/store/tasksSlice";
import { getDateString } from "../../../shared/utils/getDateString";

interface TaskInfoProps {
  taskID: string;
}

const TaskInfo: FC<TaskInfoProps> = ({ taskID }) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.tasks.list[taskID]);

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) {
      dispatch(setSelectedTaskID({ taskID: null }));
    }
  };

  return (
    <div className={style.Wrapper} onClick={handleWrapperClick}>
      <div className={style.Task}>
        <h3 className={style.Title}>{task.title}</h3>
        <p className={style.Body}>{task.body}</p>
        <p className={style.Priority}>{task.priority}</p>
        <p className={style.Date}>{getDateString(task.date)}</p>
      </div>
    </div>
  );
};

export default TaskInfo;
