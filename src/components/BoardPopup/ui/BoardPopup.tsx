import { useState, type FC } from "react";
import style from "./BoardPopup.module.scss";
import Button from "../../../shared/ui/Button/Button";
import { useAppDispatch } from "../../../app/store/appStore";
import { hideBoardPopup } from "../../../shared/store/uiSlice";
import { addBoard } from "../../../shared/store/tasksSlice";
import Heading from "../../../shared/ui/Heading/Heading";
import PopupWrapper from "../../../shared/ui/PopupWrapper/PopupWrapper";
import Input from "../../../shared/ui/Input/Input";

const BoardPopup: FC = () => {
  const dispatch = useAppDispatch();

  const [boardTitle, setBoardTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = boardTitle.trim();

    if (title) {
      dispatch(addBoard({ title }));
    }

    dispatch(hideBoardPopup());
  };

  return (
    <PopupWrapper hidePopup={() => dispatch(hideBoardPopup())}>
      <form className={style.Popup} onSubmit={handleSubmit}>
        <Heading level={3} color="black">
          Add new board
        </Heading>
        <Input
          placeholder="Board name..."
          size="big"
          className={style.Input}
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
    </PopupWrapper>
  );
};

export default BoardPopup;
