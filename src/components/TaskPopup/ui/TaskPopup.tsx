import { useState, type FC } from "react";
import style from "./TaskPopup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import type { TTaskPriority } from "../../../shared/types/types";
import { hideTaskPopup } from "../../../shared/store/uiSlice";
import { addTask, editTask, setSelectedTaskID } from "../../../shared/store/tasksSlice";
import Button from "../../../shared/ui/Button/Button";
import { useParams } from "react-router";

interface TaskPopupProps {
  editTaskID?: string;
}

const TaskPopup: FC<TaskPopupProps> = ({ editTaskID = "" }) => {
  const { boardID } = useParams();
  const task = useAppSelector((state) => (boardID ? state.tasks.boards[boardID].tasks[editTaskID] : null));

  const dispatch = useAppDispatch();

  const [titleValue, setTitleValue] = useState(task ? task.title : "");
  const [bodyValue, setBodyValue] = useState(task ? task.body : "");
  const [priority, setPriority] = useState<TTaskPriority>(task ? task.priority : "low");

  const hidePopup = () => {
    dispatch(hideTaskPopup());
    dispatch(setSelectedTaskID({ taskID: null }));
  };

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) {
      hidePopup();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleValue.trim();
    const body = bodyValue.trim();

    if (!title) return;
    if (!boardID) return;

    if (task) {
      dispatch(editTask({ taskID: editTaskID, title, body, priority, boardID }));
    } else {
      dispatch(addTask({ title, body, priority, boardID }));
    }

    hidePopup();
  };

  return (
    <div className={style.Wrapper} onClick={handleWrapperClick}>
      <form className={style.Popup} onSubmit={handleSubmit}>
        <h2 className={style.Title}>{task ? "Edit" : "Add new"} task</h2>
        <input
          type="text"
          className={style.Input}
          placeholder="Task title..."
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <textarea
          className={style.Textarea}
          placeholder="Task body..."
          value={bodyValue}
          onChange={(e) => setBodyValue(e.target.value)}
        ></textarea>
        <div className={style.Priorities}>
          <p className={style.Subtitle}>Set priority</p>
          <div className={style.Picker}>
            <button
              className={priority === "low" ? [style.Low, style.Active].join(" ") : style.Low}
              type="button"
              onClick={() => setPriority("low")}
            >
              LOW
            </button>
            <button
              className={priority === "moderate" ? [style.Moderate, style.Active].join(" ") : style.Moderate}
              type="button"
              onClick={() => setPriority("moderate")}
            >
              MODERATE
            </button>
            <button
              className={priority === "high" ? [style.High, style.Active].join(" ") : style.High}
              type="button"
              onClick={() => setPriority("high")}
            >
              HIGH
            </button>
          </div>
        </div>
        <div className={style.Buttons}>
          <Button size="big" type="button" onClick={hidePopup}>
            Cancel
          </Button>
          <Button size="big" type="submit">
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskPopup;
