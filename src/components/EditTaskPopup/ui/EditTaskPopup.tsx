import { useState, type FC } from "react";
import style from "./EditTaskPopup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { editTask, setSelectedTaskID } from "../../../shared/store/tasksSlice";
import type { TTaskPriority } from "../../../shared/types/types";

interface EditTaskPopupProps {
  taskID: string;
}

const EditTaskPopup: FC<EditTaskPopupProps> = ({ taskID }) => {
  const task = useAppSelector((state) => state.tasks.list[taskID]);

  const [title, setTitle] = useState(task.title);
  const [body, setBody] = useState(task.body);
  const [priority, setPriority] = useState<TTaskPriority>(task.priority);

  const dispatch = useAppDispatch();

  const handleHidePopup = () => {
    dispatch(setSelectedTaskID({ taskID: null }));
  };

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) handleHidePopup();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const taskTitle = title.trim();
    const taskBody = body.trim();

    if (taskTitle) {
      dispatch(editTask({ taskID, title: taskTitle, body: taskBody, priority }));
      handleHidePopup();
    }
  };

  return (
    <div className={style.Wrapper} onClick={handleWrapperClick}>
      <form className={style.Popup} onSubmit={handleSubmit}>
        <h2 className={style.Title}>Edit task</h2>
        <input
          type="text"
          className={style.Input}
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={style.Textarea}
          placeholder="Task body..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
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
          <button className={style.Button} type="button" onClick={handleHidePopup}>
            Cancel
          </button>
          <button className={style.Button} type="submit">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskPopup;
