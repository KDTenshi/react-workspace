import { useState, type FC } from "react";
import style from "./TasksBoard.module.scss";
import { TasksColumn } from "../../TasksColumn";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import {
  addTask,
  changeTaskColumn,
  changeTaskPosition,
  deleteBoard,
  editBoard,
  setDraggingTaskID,
} from "../../../shared/store/tasksSlice";
import type { TColumnType } from "../../../shared/types/types";
import { TaskCard } from "../../TaskCard";
import Button from "../../../shared/ui/Button/Button";
import { ConfirmPopup } from "../../ConfirmPopup";
import { useNavigate } from "react-router";

interface TasksBoardProps {
  boardID: string;
}

const TasksBoard: FC<TasksBoardProps> = ({ boardID }) => {
  const dispatch = useAppDispatch();
  const draggingTaskID = useAppSelector((state) => state.tasks.draggingTaskID);
  const board = useAppSelector((state) => state.tasks.boards[boardID]);

  const [isBoardEdit, setIsBoardEdit] = useState(false);
  const [editBoardValue, setEditBoardValue] = useState(board.title);
  const [isDeleting, setIsDeleting] = useState(false);

  const [titleValue, setTitleValue] = useState("");

  const navigate = useNavigate();

  const handleDragStart = (e: DragStartEvent) => {
    const taskID = e.active.id as string;

    dispatch(setDraggingTaskID({ taskID }));
  };

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });

  const sensors = useSensors(mouseSensor);

  const handleDragOver = (e: DragOverEvent) => {
    const active = e.active;
    const over = e.over;

    const taskID = active.id as string;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    const activeType = activeData.type;
    const overType = overData.type;

    if (activeType === overType) {
      const overTaskID = over.id as string;

      dispatch(changeTaskPosition({ taskID, overTaskID, boardID }));
    }

    if (activeType !== overType) {
      const column = over.id as TColumnType;

      dispatch(changeTaskColumn({ taskID, column, boardID }));
    }
  };

  const handleDragEnd = () => {
    dispatch(setDraggingTaskID({ taskID: null }));
  };

  const handleAddTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleValue.trim();

    if (title) {
      dispatch(addTask({ title, boardID }));
      setTitleValue("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = editBoardValue.trim();

    if (title) {
      dispatch(editBoard({ boardID, title }));
    }

    setIsBoardEdit(false);
  };

  const handleBoardDelete = () => {
    navigate("/", { replace: true });
    setTimeout(() => dispatch(deleteBoard({ boardID })), 10);
  };

  return (
    <div className={style.Board}>
      <div className={style.Head}>
        <div className={style.Info}>
          {!isBoardEdit && <h3 className={style.Title}>{board.title}</h3>}
          {isBoardEdit && (
            <form className={style.Form} onSubmit={handleSubmit}>
              <input
                type="text"
                value={editBoardValue}
                onChange={(e) => setEditBoardValue(e.target.value)}
                className={style.Input}
                placeholder="Board title..."
                autoFocus
                onBlur={() => setIsBoardEdit(false)}
              />
            </form>
          )}
          <div className={style.Buttons}>
            <Button size="big" onClick={() => setIsBoardEdit(true)}>
              Edit
            </Button>
            <Button size="big" onClick={() => setIsDeleting(true)}>
              Delete
            </Button>
          </div>
        </div>
        <form className={style.TaskForm} onSubmit={handleAddTaskSubmit}>
          <input
            type="text"
            placeholder="Task title..."
            className={style.TaskInput}
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <Button size="medium">Add task</Button>
        </form>
      </div>
      <div className={style.Columns}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          collisionDetection={pointerWithin}
        >
          <TasksColumn type={"todo"} boardID={boardID} />
          <TasksColumn type={"doing"} boardID={boardID} />
          <TasksColumn type={"done"} boardID={boardID} />
          <DragOverlay>{draggingTaskID && <TaskCard taskID={draggingTaskID} boardID={boardID} />}</DragOverlay>
        </DndContext>
        {isDeleting && (
          <ConfirmPopup
            question="Delete board?"
            handleConfirm={handleBoardDelete}
            hidePopup={() => setIsDeleting(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TasksBoard;
