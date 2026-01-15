import type { FC } from "react";
import "../style/App.scss";
import { Header } from "../../components/Header";
import { TasksBoard } from "../../components/TasksBoard";
import { AddTaskPopup } from "../../components/AddTaskPopup";
import { useAppSelector } from "../store/appStore";

const App: FC = () => {
  const isFormShown = useAppSelector((state) => state.tasks.isFormShown);

  return (
    <div className="App">
      <Header />
      <TasksBoard />
      {isFormShown && <AddTaskPopup />}
    </div>
  );
};

export default App;
