import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TBoard, TColumnType, TTask, TTaskPriority } from "../types/types";
import { arrayMove } from "@dnd-kit/sortable";

type TasksState = {
  list: { [key: string]: TTask };
  columns: { [key in TColumnType]: string[] };
  draggingTaskID: string | null;
  selectedTaskID: string | null;
  boards: { [key: string]: TBoard };
  selectedBoardID: string | null;
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
  selectedBoardID: null,
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

      if (!state.selectedBoardID) return;

      state.boards[state.selectedBoardID].columns.todo.push(newTask.id);
      state.boards[state.selectedBoardID].tasks[newTask.id] = newTask;
    },
    editTask: (
      state,
      action: PayloadAction<{ taskID: string; title: string; body: string; priority: TTaskPriority }>,
    ) => {
      const { taskID, title, body, priority } = action.payload;

      if (!state.selectedBoardID) return;

      const task = state.boards[state.selectedBoardID].tasks[taskID];

      console.log(task);

      task.title = title;
      task.body = body;
      task.priority = priority;
    },
    deleteTask: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      if (!state.selectedBoardID) return;

      const toDelete = state.boards[state.selectedBoardID].tasks[taskID];

      state.boards[state.selectedBoardID].columns[toDelete.column] = state.boards[state.selectedBoardID].columns[
        toDelete.column
      ].filter((id) => id !== taskID);
      delete state.boards[state.selectedBoardID].tasks[taskID];
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

      if (!state.selectedBoardID) return;

      const task = state.boards[state.selectedBoardID].tasks[taskID];

      if (!task) return;

      const prevColumn = task.column;

      if (column === prevColumn) return;

      state.boards[state.selectedBoardID].columns[prevColumn] = state.boards[state.selectedBoardID].columns[
        prevColumn
      ].filter((id) => id !== taskID);
      state.boards[state.selectedBoardID].columns[column].push(taskID);
      task.column = column;
    },
    changeTaskPosition: (state, action: PayloadAction<{ taskID: string; overTaskID: string }>) => {
      const { taskID, overTaskID } = action.payload;

      if (!state.selectedBoardID) return;

      const column = state.boards[state.selectedBoardID].tasks[taskID].column;

      const taskIndex = state.boards[state.selectedBoardID].columns[column].findIndex((id) => id === taskID);
      const overTaskIndex = state.boards[state.selectedBoardID].columns[column].findIndex((id) => id === overTaskID);

      if (taskIndex === -1 || overTaskIndex === -1) return;

      state.boards[state.selectedBoardID].columns[column] = arrayMove(
        state.boards[state.selectedBoardID].columns[column],
        taskIndex,
        overTaskIndex,
      );
    },
    setSelectedBoardID: (state, action: PayloadAction<{ boardID: string }>) => {
      const { boardID } = action.payload;

      state.selectedBoardID = boardID;
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
  setSelectedBoardID,
  addBoard,
} = tasksSlice.actions;
