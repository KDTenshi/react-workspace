import type { FC } from "react";
import style from "./TasksColumn.module.scss";
import { TaskCard } from "../../TaskCard";
import type { TColumnType } from "../../../shared/types/types";
import { useAppSelector } from "../../../app/store/appStore";
import { useSortable } from "@dnd-kit/sortable";

interface TasksColumnProps {
  type: TColumnType;
  boardID: string;
}

const columnTitles: { [key in TColumnType]: string } = {
  todo: "To Do",
  doing: "In progress",
  done: "Done",
};

const TasksColumn: FC<TasksColumnProps> = ({ type, boardID }) => {
  const { setNodeRef } = useSortable({ id: type, data: { type: "column" } });

  const tasksIDs = useAppSelector((state) => state.tasks.boards[boardID].columns[type]);

  return (
    <div className={style.Column}>
      <h2 className={style.Title}>{columnTitles[type]}</h2>
      <div className={style.Tasks} ref={setNodeRef}>
        {tasksIDs.length === 0 && <p className={style.Empty}>No tasks here yet</p>}
        {tasksIDs.map((taskID) => (
          <TaskCard taskID={taskID} key={taskID} boardID={boardID} />
        ))}
      </div>
    </div>
  );
};

export default TasksColumn;
