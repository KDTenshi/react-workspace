import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TBoard, TColumnType, TTask, TTaskPriority } from "../types/types";
import { arrayMove } from "@dnd-kit/sortable";

type TasksState = {
  draggingTaskID: string | null;
  selectedTaskID: string | null;
  boards: { [key: string]: TBoard };
  recentBoards: string[];
};

const initialState: TasksState = {
  draggingTaskID: null,
  selectedTaskID: null,
  boards: {},
  recentBoards: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; boardID: string }>) => {
      const { title, boardID } = action.payload;

      const newTask: TTask = {
        id: nanoid(),
        title,
        body: "",
        date: Date.now(),
        column: "todo",
        priority: "low",
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

      if (state.selectedTaskID === taskID) state.selectedTaskID = null;
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
    addBoard: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const { title, description } = action.payload;

      const newBoard: TBoard = {
        id: nanoid(),
        title,
        description,
        tasks: {},
        columns: {
          todo: [],
          doing: [],
          done: [],
        },
      };

      state.boards[newBoard.id] = newBoard;
    },
    editBoard: (state, action: PayloadAction<{ boardID: string; title: string }>) => {
      const { boardID, title } = action.payload;

      state.boards[boardID].title = title;
    },
    deleteBoard: (state, acton: PayloadAction<{ boardID: string }>) => {
      const { boardID } = acton.payload;

      delete state.boards[boardID];
    },
    addRecentBoard: (state, action: PayloadAction<{ boardID: string }>) => {
      const { boardID } = action.payload;

      if (state.recentBoards.includes(boardID)) {
        const position = state.recentBoards.findIndex((id) => id === boardID);
        state.recentBoards = arrayMove(state.recentBoards, position, 0);
      } else {
        state.recentBoards = [boardID, ...state.recentBoards];
      }

      if (state.recentBoards.length > 4) state.recentBoards.pop();
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
  editBoard,
  deleteBoard,
  addRecentBoard,
} = tasksSlice.actions;
