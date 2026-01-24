import type { FC } from "react";
import "../style/App.scss";
import { Header } from "../../components/Header";
import { BrowserRouter, Route, Routes } from "react-router";
import { BoardPage } from "../../pages/BoardPage";
import { SideMenu } from "../../components/SideMenu";

const App: FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="Content">
          <SideMenu />
          <Routes>
            <Route path="/" element={<div className="Home">Home Page</div>} />
            <Route path="/board/:boardID" element={<BoardPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
