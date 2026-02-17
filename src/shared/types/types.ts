export type TColumnType = "todo" | "doing" | "done";

export type TTaskPriority = "low" | "moderate" | "high";

export type TTask = {
  id: string;
  title: string;
  body: string;
  date: number;
  column: TColumnType;
  priority: TTaskPriority;
};

export type TBoard = {
  id: string;
  title: string;
  description: string;
  tasks: { [key: string]: TTask };
  columns: { [key in TColumnType]: string[] };
};

export type StylesUnion<T extends string | number> = { [key in T]: string };
