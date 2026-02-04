import { type FC } from "react";
import style from "./TaskCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { useSortable } from "@dnd-kit/sortable";
import type { TTaskPriority } from "../../../shared/types/types";
import { setSelectedTaskID } from "../../../shared/store/tasksSlice";
import { getDateString } from "../../../shared/utils/getDateString";
import Heading from "../../../shared/ui/Heading/Heading";
import Text from "../../../shared/ui/Text/Text";

interface TaskCardProps {
  taskID: string;
  boardID: string;
}

const priorityStyles: { [key in TTaskPriority]: string } = {
  low: style.Low,
  moderate: style.Moderate,
  high: style.High,
};

const TaskCard: FC<TaskCardProps> = ({ taskID, boardID }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id: taskID, data: { type: "task" } });
  const task = useAppSelector((state) => state.tasks.boards[boardID].tasks[taskID]);

  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    dispatch(setSelectedTaskID({ taskID }));
  };

  return (
    <div className={style.Task} {...attributes} {...listeners} ref={setNodeRef} onClick={handleEditClick}>
      <div className={style.Content}>
        <div className={style.Info}>
          <Heading level={4} color="black">
            {task.title}
          </Heading>
          <p className={priorityStyles[task.priority]}>{task.priority}</p>
        </div>
      </div>
      <Text size="medium" color="dark" align="right">
        {getDateString(task.date)}
      </Text>
    </div>
  );
};

export default TaskCard;
