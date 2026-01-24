import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TBoard, TColumnType, TTask, TTaskPriority } from "../types/types";
import { arrayMove } from "@dnd-kit/sortable";

type TasksState = {
  draggingTaskID: string | null;
  selectedTaskID: string | null;
  boards: { [key: string]: TBoard };
};

const initialState: TasksState = {
  draggingTaskID: null,
  selectedTaskID: null,
  boards: {
    "001": {
      id: "001",
      title: "Board 1",
      tasks: {
        t01: {
          id: "t01",
          title: "Task 1",
          body: "",
          date: Date.now(),
          priority: "low",
          column: "todo",
        },
      },
      columns: {
        todo: ["t01"],
        doing: [],
        done: [],
      },
    },
    "002": {
      id: "002",
      title: "Board 2",
      tasks: {
        t02: {
          id: "t02",
          title: "Task 2",
          body: "",
          date: Date.now(),
          priority: "moderate",
          column: "doing",
        },
      },
      columns: {
        todo: [],
        doing: ["t02"],
        done: [],
      },
    },
    "003": {
      id: "003",
      title: "Board 3",
      tasks: {
        t03: {
          id: "t03",
          title: "Task 3",
          body: "",
          date: Date.now(),
          priority: "high",
          column: "done",
        },
      },
      columns: {
        todo: [],
        doing: [],
        done: ["t03"],
      },
    },
  },
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ title: string; body: string; priority: TTaskPriority; boardID: string }>,
    ) => {
      const { title, body, priority, boardID } = action.payload;

      const newTask: TTask = {
        id: nanoid(),
        title,
        body,
        date: Date.now(),
        column: "todo",
        priority,
      };

      state.boards[boardID].columns.todo.push(newTask.id);
      state.boards[boardID].tasks[newTask.id] = newTask;
    },
    editTask: (
      state,
      action: PayloadAction<{ taskID: string; title: string; body: string; priority: TTaskPriority; boardID: string }>,
    ) => {
      const { taskID, title, body, priority, boardID } = action.payload;

      const task = state.boards[boardID].tasks[taskID];

      task.title = title;
      task.body = body;
      task.priority = priority;
    },
    deleteTask: (state, action: PayloadAction<{ taskID: string; boardID: string }>) => {
      const { taskID, boardID } = action.payload;

      const toDelete = state.boards[boardID].tasks[taskID];

      state.boards[boardID].columns[toDelete.column] = state.boards[boardID].columns[toDelete.column].filter(
        (id) => id !== taskID,
      );
      delete state.boards[boardID].tasks[taskID];
    },
    setDraggingTaskID: (state, action: PayloadAction<{ taskID: string | null }>) => {
      const { taskID } = action.payload;

      state.draggingTaskID = taskID;
    },
    setSelectedTaskID: (state, action: PayloadAction<{ taskID: string | null }>) => {
      const { taskID } = action.payload;

      state.selectedTaskID = taskID;
    },
    changeTaskColumn: (state, action: PayloadAction<{ taskID: string; boardID: string; column: TColumnType }>) => {
      const { taskID, boardID, column } = action.payload;

      const task = state.boards[boardID].tasks[taskID];

      if (!task) return;

      const prevColumn = task.column;

      if (column === prevColumn) return;

      state.boards[boardID].columns[prevColumn] = state.boards[boardID].columns[prevColumn].filter(
        (id) => id !== taskID,
      );
      state.boards[boardID].columns[column].push(taskID);
      task.column = column;
    },
    changeTaskPosition: (state, action: PayloadAction<{ taskID: string; overTaskID: string; boardID: string }>) => {
      const { taskID, overTaskID, boardID } = action.payload;

      const column = state.boards[boardID].tasks[taskID].column;

      const taskIndex = state.boards[boardID].columns[column].findIndex((id) => id === taskID);
      const overTaskIndex = state.boards[boardID].columns[column].findIndex((id) => id === overTaskID);

      if (taskIndex === -1 || overTaskIndex === -1) return;

      state.boards[boardID].columns[column] = arrayMove(
        state.boards[boardID].columns[column],
        taskIndex,
        overTaskIndex,
      );
    },
    addBoard: (state) => {
      const title = `Board ${Date.now() % 1000}`;

      const newBoard: TBoard = {
        id: nanoid(),
        title,
        tasks: {},
        columns: {
          todo: [],
          doing: [],
          done: [],
        },
      };

      state.boards[newBoard.id] = newBoard;
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
  addBoard,
} = tasksSlice.actions;
