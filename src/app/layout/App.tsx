import type { FC } from "react";
import "../style/App.scss";
import { Header } from "../../components/Header";
import { TasksBoard } from "../../components/TasksBoard";
import { AddTaskPopup } from "../../components/AddTaskPopup";
import { useAppSelector } from "../store/appStore";
import { EditTaskPopup } from "../../components/EditTaskPopup";

const App: FC = () => {
  const isFormShown = useAppSelector((state) => state.tasks.isFormShown);
  const selectedTaskID = useAppSelector((state) => state.tasks.selectedTaskID);

  return (
    <div className="App">
      <Header />
      <TasksBoard />
      {isFormShown && <AddTaskPopup />}
      {selectedTaskID && <EditTaskPopup taskID={selectedTaskID} />}
    </div>
  );
};

export default App;
