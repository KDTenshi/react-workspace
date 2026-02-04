import type { FC } from "react";
import style from "./TasksColumn.module.scss";
import { TaskCard } from "../../TaskCard";
import type { TColumnType } from "../../../shared/types/types";
import { useAppSelector } from "../../../app/store/appStore";
import { useSortable } from "@dnd-kit/sortable";
import Heading from "../../../shared/ui/Heading/Heading";
import Text from "../../../shared/ui/Text/Text";

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
      <Heading level={3} color="black">
        {columnTitles[type]}
      </Heading>
      <div className={style.Tasks} ref={setNodeRef}>
        {tasksIDs.length === 0 && (
          <Text size="big" color="dark" align="center">
            No tasks here
          </Text>
        )}
        {tasksIDs.map((taskID) => (
          <TaskCard taskID={taskID} key={taskID} boardID={boardID} />
        ))}
      </div>
    </div>
  );
};

export default TasksColumn;
