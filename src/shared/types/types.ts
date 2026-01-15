export type TColumnType = "todo" | "doing" | "done";

export type TTask = {
  id: string;
  title: string;
  body: string;
  date: number;
  column: TColumnType;
};
