import type { FC } from "react";
import "../style/App.scss";
import { Header } from "../../components/Header";
import { TasksBoard } from "../../components/TasksBoard";
import { useAppSelector } from "../store/appStore";
import { TaskPopup } from "../../components/TaskPopup";

const App: FC = () => {
  const selectedTaskID = useAppSelector((state) => state.tasks.selectedTaskID);
  const isTaskPopupShown = useAppSelector((state) => state.ui.isTaskPopupShown);
  const selectedBoardID = useAppSelector((state) => state.tasks.selectedBoardID);

  return (
    <div className="App">
      <Header />
      {selectedBoardID && <TasksBoard boardID={selectedBoardID} />}
      {selectedTaskID && <TaskPopup editTaskID={selectedTaskID} />}
      {isTaskPopupShown && <TaskPopup />}
    </div>
  );
};

export default App;
