import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumnType, TTask, TTaskPriority } from "../types/types";
import { arrayMove } from "@dnd-kit/sortable";

type TasksState = {
  list: { [key: string]: TTask };
  columns: { [key in TColumnType]: string[] };
  draggingTaskID: string | null;
  selectedTaskID: string | null;
};

const initialState: TasksState = {
  list: {},
  columns: {
    todo: [],
    doing: [],
    done: [],
  },
  draggingTaskID: null,
  selectedTaskID: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; body: string; priority: TTaskPriority }>) => {
      const { title, body, priority } = action.payload;

      const newTask: TTask = {
        id: nanoid(),
        title,
        body,
        date: Date.now(),
        column: "todo",
        priority,
      };

      state.columns.todo.push(newTask.id);
      state.list[newTask.id] = newTask;
    },
    editTask: (
      state,
      action: PayloadAction<{ taskID: string; title: string; body: string; priority: TTaskPriority }>,
    ) => {
      const { taskID, title, body, priority } = action.payload;

      const task = state.list[taskID];

      console.log(task);

      task.title = title;
      task.body = body;
      task.priority = priority;
    },
    deleteTask: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      const toDelete = state.list[taskID];

      state.columns[toDelete.column] = state.columns[toDelete.column].filter((id) => id !== taskID);
      delete state.list[taskID];
    },
    setDraggingTaskID: (state, action: PayloadAction<{ taskID: string | null }>) => {
      const { taskID } = action.payload;

      state.draggingTaskID = taskID;
    },
    setSelectedTaskID: (state, action: PayloadAction<{ taskID: string | null }>) => {
      const { taskID } = action.payload;

      state.selectedTaskID = taskID;
    },
    changeTaskColumn: (state, action: PayloadAction<{ taskID: string; column: TColumnType }>) => {
      const { taskID, column } = action.payload;

      const task = state.list[taskID];

      if (!task) return;

      const prevColumn = task.column;

      if (column === prevColumn) return;

      state.columns[prevColumn] = state.columns[prevColumn].filter((id) => id !== taskID);
      state.columns[column].push(taskID);

      task.column = column;
    },
    changeTaskPosition: (state, action: PayloadAction<{ taskID: string; overTaskID: string }>) => {
      const { taskID, overTaskID } = action.payload;

      const column = state.list[taskID].column;

      const taskIndex = state.columns[column].findIndex((id) => id === taskID);
      const overTaskIndex = state.columns[column].findIndex((id) => id === overTaskID);

      if (taskIndex === -1 || overTaskIndex === -1) return;

      state.columns[column] = arrayMove(state.columns[column], taskIndex, overTaskIndex);
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  setDraggingTaskID,
  setSelectedTaskID,
  changeTaskColumn,
  changeTaskPosition,
} = tasksSlice.actions;
