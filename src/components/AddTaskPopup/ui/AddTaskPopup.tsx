import { useState, type FC } from "react";
import style from "./AddTaskPopup.module.scss";
import { useAppDispatch } from "../../../app/store/appStore";
import { addTask, hideForm } from "../../../shared/store/tasksSlice";

const AddTaskPopup: FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useAppDispatch();

  const handleHidePopup = () => {
    dispatch(hideForm());
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
      dispatch(addTask({ title: taskTitle, body: taskBody }));
      handleHidePopup();
    }
  };

  return (
    <div className={style.Wrapper} onClick={handleWrapperClick}>
      <form className={style.Popup} onSubmit={handleSubmit}>
        <h2 className={style.Title}>Add new task</h2>
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

export default AddTaskPopup;
