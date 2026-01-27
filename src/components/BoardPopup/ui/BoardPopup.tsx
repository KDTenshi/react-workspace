import { useState, type FC } from "react";
import style from "./BoardPopup.module.scss";
import Button from "../../../shared/ui/Button/Button";
import { useAppDispatch } from "../../../app/store/appStore";
import { hideBoardPopup } from "../../../shared/store/uiSlice";
import { addBoard } from "../../../shared/store/tasksSlice";

const BoardPopup: FC = () => {
  const dispatch = useAppDispatch();

  const [boardTitle, setBoardTitle] = useState("");

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) {
      dispatch(hideBoardPopup());
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = boardTitle.trim();

    if (title) {
      dispatch(addBoard({ title }));
    }

    dispatch(hideBoardPopup());
  };

  return (
    <div className={style.Wrapper} onClick={handleWrapperClick}>
      <form className={style.Popup} onSubmit={handleSubmit}>
        <h2 className={style.Title}>Add new board</h2>
        <input
          type="text"
          className={style.Input}
          placeholder="Board name"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
        <div className={style.Buttons}>
          <Button size={"big"} type="button" onClick={() => dispatch(hideBoardPopup())}>
            Cancel
          </Button>
          <Button size={"big"} type="submit">
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BoardPopup;
