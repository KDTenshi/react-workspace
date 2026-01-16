import type { FC } from "react";
import style from "./TasksBoard.module.scss";
import { TasksColumn } from "../../TasksColumn";
import { DndContext, DragOverlay, pointerWithin, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { changeTaskColumn, changeTaskPosition, setSelectedTaskID } from "../../../shared/store/tasksSlice";
import type { TColumnType } from "../../../shared/types/types";
import { TaskCard } from "../../TaskCard";

const TasksBoard: FC = () => {
  const dispatch = useAppDispatch();
  const selectedTaskID = useAppSelector((state) => state.tasks.selectedTaskID);

  const handleDragStart = (e: DragStartEvent) => {
    const taskID = e.active.id as string;

    dispatch(setSelectedTaskID({ taskID }));
  };

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

      dispatch(changeTaskPosition({ taskID, overTaskID }));
    }

    if (activeType !== overType) {
      const column = over.id as TColumnType;

      dispatch(changeTaskColumn({ taskID, column }));
    }
  };

  const handleDragEnd = () => {
    dispatch(setSelectedTaskID({ taskID: null }));
  };

  return (
    <div className={style.Board}>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
      >
        <TasksColumn type={"todo"} />
        <TasksColumn type={"doing"} />
        <TasksColumn type={"done"} />
        <DragOverlay>{selectedTaskID && <TaskCard taskID={selectedTaskID} />}</DragOverlay>
      </DndContext>
    </div>
  );
};

export default TasksBoard;
