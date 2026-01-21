import { useState, type FC } from "react";
import style from "./TaskCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { useSortable } from "@dnd-kit/sortable";
import type { TTaskPriority } from "../../../shared/types/types";
import { deleteTask, setSelectedTaskID } from "../../../shared/store/tasksSlice";
import { getDateString } from "../../../shared/utils/getDateString";
import Button from "../../../shared/ui/Button/Button";
import { ConfirmPopup } from "../../ConfirmPopup";
import Icon from "../../../shared/ui/Icon/Icon";

interface TaskCardProps {
  taskID: string;
}

const priorityStyles: { [key in TTaskPriority]: string } = {
  low: style.Low,
  moderate: style.Moderate,
  high: style.High,
};

const TaskCard: FC<TaskCardProps> = ({ taskID }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { attributes, listeners, setNodeRef } = useSortable({ id: taskID, data: { type: "task" } });
  const task = useAppSelector((state) => state.tasks.list[taskID]);

  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    dispatch(setSelectedTaskID({ taskID }));
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  return (
    <div className={style.Task} {...attributes} {...listeners} ref={setNodeRef}>
      <div className={style.Content}>
        <div className={style.Info}>
          <h2 className={style.Title}>{task.title}</h2>
          <p className={style.Body}>{task.body.length > 0 ? task.body : "No body..."}</p>
          <p className={priorityStyles[task.priority]}>{task.priority}</p>
        </div>
        <div className={style.Controls}>
          <Button size="medium" onClick={handleDeleteClick}>
            <Icon type="delete" />
          </Button>
          <Button size="medium" onClick={handleEditClick}>
            <Icon type="edit" />
          </Button>
        </div>
      </div>
      <p className={style.Date}>{getDateString(task.date)}</p>

      {isDeleting && (
        <ConfirmPopup
          question="Delete task?"
          hidePopup={() => setIsDeleting(false)}
          handleConfirm={() => dispatch(deleteTask({ taskID }))}
        />
      )}
    </div>
  );
};

export default TaskCard;
