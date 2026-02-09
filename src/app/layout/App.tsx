import type { FC } from "react";
import "../style/App.scss";
import { Header } from "../../components/Header";
import { BrowserRouter, Route, Routes } from "react-router";
import { BoardPage } from "../../pages/BoardPage";
import { SideMenu } from "../../components/SideMenu";
import { BoardPopup } from "../../components/BoardPopup";
import { useAppSelector } from "../store/appStore";
import BoardsPage from "../../pages/BoardsPage/ui/BoardsPage";

const App: FC = () => {
  const isBoardPopupShown = useAppSelector((state) => state.ui.isBoardPopupShown);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="Content">
          <SideMenu />
          <Routes>
            <Route path="/" element={<div className="Home">Home Page</div>} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/boards/:boardID" element={<BoardPage />} />
          </Routes>
        </div>
        {isBoardPopupShown && <BoardPopup />}
      </div>
    </BrowserRouter>
  );
};

export default App;
