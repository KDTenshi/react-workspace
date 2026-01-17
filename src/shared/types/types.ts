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
