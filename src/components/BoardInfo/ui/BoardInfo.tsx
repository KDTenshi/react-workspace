import { useState, type FC } from "react";
import style from "./BoardInfo.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import Heading from "../../../shared/ui/Heading/Heading";
import Text from "../../../shared/ui/Text/Text";
import { Link, useNavigate } from "react-router";
import Button from "../../../shared/ui/Button/Button";
import Input from "../../../shared/ui/Input/Input";
import Textarea from "../../../shared/ui/Textarea/Textarea";
import { deleteBoard, editBoard } from "../../../shared/store/tasksSlice";
import { ConfirmPopup } from "../../ConfirmPopup";

interface BoardInfoProps {
  boardID: string;
}

const BoardInfo: FC<BoardInfoProps> = ({ boardID }) => {
  const board = useAppSelector((state) => state.tasks.boards[boardID]);

  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const [editTitleValue, setEditTitleValue] = useState(board.title);
  const [editDescriptionValue, setEditDescriptionValue] = useState(board.description);

  const [isDelete, setIsDelete] = useState(false);

  const navigate = useNavigate();

  const handleCancelEdit = () => {
    setIsEdit(false);

    setEditTitleValue(board.title);
    setEditDescriptionValue(board.description);
  };

  const handleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = editTitleValue.trim();
    const description = editDescriptionValue.trim();

    if (title) {
      dispatch(editBoard({ boardID: board.id, title, description }));
    }

    setIsEdit(false);
  };

  const handleDelete = () => {
    navigate("/");

    setTimeout(() => {
      dispatch(deleteBoard({ boardID: board.id }));
    }, 500);
  };

  return (
    <div className={style.Info}>
      {isDelete && (
        <ConfirmPopup question="Delete board?" handleConfirm={handleDelete} hidePopup={() => setIsDelete(false)} />
      )}
      <div className={style.Head}>
        <Link to={`/boards/${boardID}`} className={style.Link}>
          <Text size="big" color="dark">
            Go back
          </Text>
        </Link>
        <div className={style.Controls}>
          {isEdit && (
            <Button size="big" onClick={handleCancelEdit}>
              Cancel
            </Button>
          )}
          {!isEdit && (
            <Button size="big" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          )}
          <Button size="big" onClick={() => setIsDelete(true)}>
            Delete
          </Button>
        </div>
      </div>
      <div className={style.Content}>
        {!isEdit && (
          <>
            <Heading color="black" level={3}>
              {board.title}
            </Heading>
            <Text size="big" color="dark">
              {board.description ? board.description : "No descriprion"}
            </Text>
          </>
        )}
        {isEdit && (
          <form className={style.Form} onSubmit={handleEditTask}>
            <Input
              placeholder="Board title..."
              size="big"
              value={editTitleValue}
              onChange={(e) => setEditTitleValue(e.target.value)}
            />
            <Textarea
              placeholder="Board descriprion..."
              value={editDescriptionValue}
              onChange={(e) => setEditDescriptionValue(e.target.value)}
            />
            <Button type="submit" className={style.Button} size="big">
              Confirm
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BoardInfo;
