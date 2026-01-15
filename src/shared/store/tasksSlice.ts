import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumnType, TTask } from "../types/types";

type TasksState = {
  list: { [key: string]: TTask };
  columns: { [key in TColumnType]: string[] };
  isFormShown: boolean;
};

const initialState: TasksState = {
  list: {},
  columns: {
    todo: [],
    doing: [],
    done: [],
  },
  isFormShown: false,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string }>) => {
      const newTask: TTask = {
        id: nanoid(),
        title: action.payload.title,
        body: "Sample text...",
        date: Date.now(),
        column: "todo",
      };

      state.columns.todo.push(newTask.id);
      state.list[newTask.id] = newTask;
    },
    showForm: (state) => {
      state.isFormShown = true;
    },
    hideForm: (state) => {
      state.isFormShown = false;
    },
  },
});

export const { addTask, showForm, hideForm } = tasksSlice.actions;
