import type { FC } from "react";
import "../style/App.scss";
import { Header } from "../../components/Header";
import { TasksBoard } from "../../components/TasksBoard";

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <TasksBoard />
    </div>
  );
};

export default App;
