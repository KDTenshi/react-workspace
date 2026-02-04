import { useState, type FC } from "react";
import style from "./TaskInfoPopup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import Button from "../../../shared/ui/Button/Button";
import type { TTaskPriority } from "../../../shared/types/types";
import { deleteTask, editTask, setSelectedTaskID } from "../../../shared/store/tasksSlice";
import { ConfirmPopup } from "../../ConfirmPopup";
import Heading from "../../../shared/ui/Heading/Heading";
import PopupWrapper from "../../../shared/ui/PopupWrapper/PopupWrapper";

interface TaskInfoPopupProps {
  taskID: string;
  boardID: string;
}

const TaskInfoPopup: FC<TaskInfoPopupProps> = ({ taskID, boardID }) => {
  const task = useAppSelector((state) => state.tasks.boards[boardID].tasks[taskID]);

  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskBody, setTaskBody] = useState(task.body);
  const [priority, setPriority] = useState<TTaskPriority>(task.priority);

  const [isDelete, setIsDelete] = useState(false);

  const dispatch = useAppDispatch();

  const getPriorityButtonClassName = (buttonTitle: TTaskPriority) => {
    if (buttonTitle === "low") {
      if (priority === "low") {
        return [style.Low, style.Active].join(" ");
      } else {
        return style.Low;
      }
    }

    if (buttonTitle === "moderate") {
      if (priority === "moderate") {
        return [style.Moderate, style.Active].join(" ");
      } else {
        return style.Moderate;
      }
    }

    if (buttonTitle === "high") {
      if (priority === "high") {
        return [style.High, style.Active].join(" ");
      } else {
        return style.High;
      }
    }
  };

  const hidePopup = () => {
    dispatch(setSelectedTaskID({ taskID: null }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = taskTitle.trim();
    const body = taskBody.trim();

    if (title) {
      dispatch(editTask({ taskID, title, body, priority, boardID }));
      hidePopup();
    }
  };

  return (
    <PopupWrapper hidePopup={hidePopup}>
      {isDelete && (
        <ConfirmPopup
          question="Delete task?"
          handleConfirm={() => dispatch(deleteTask({ taskID, boardID }))}
          hidePopup={() => setIsDelete(false)}
        />
      )}
      <div className={style.Popup}>
        <Heading level={3} color="black">
          Task info
        </Heading>
        <form className={style.Form} onSubmit={handleSubmit}>
          <input
            type="text"
            className={style.Input}
            placeholder="Task title..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <textarea
            className={style.Textarea}
            placeholder="Task body..."
            value={taskBody}
            onChange={(e) => setTaskBody(e.target.value)}
          ></textarea>
          <div className={style.Priorities}>
            <Heading level={4} color="dark">
              Task priority
            </Heading>
            <div className={style.Picker}>
              <button type="button" className={getPriorityButtonClassName("low")} onClick={() => setPriority("low")}>
                Low
              </button>
              <button
                type="button"
                className={getPriorityButtonClassName("moderate")}
                onClick={() => setPriority("moderate")}
              >
                Moderate
              </button>
              <button type="button" className={getPriorityButtonClassName("high")} onClick={() => setPriority("high")}>
                High
              </button>
            </div>
          </div>
          <div className={style.Controls}>
            <Button size="big" type="button" onClick={() => setIsDelete(true)}>
              Delete
            </Button>
            <div className={style.Buttons}>
              <Button size="big" type="button" onClick={hidePopup}>
                Cancel
              </Button>
              <Button size="big" type="submit">
                Confirm
              </Button>
            </div>
          </div>
        </form>
      </div>
    </PopupWrapper>
  );
};

export default TaskInfoPopup;
