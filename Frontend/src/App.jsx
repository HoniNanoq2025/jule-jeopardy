import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StartSpilForside from "./pages/StartSpilForside/StartSpilForside";
import NameGame from "./pages/NameGame/NameGame";
import CreateNewCategory from "./pages/CreateNewCategory/CreateNewCategory";
import GameCreated from "./pages/GameCreated/GameCreated";
import AddTeam from "./pages/AddTeam/AddTeam";
import ChooseGame from "./pages/ChooseGame/ChooseGame";
import Jeopardy from "./pages/Jeopardy/Jeopardy";
import EditGame from "./pages/EditGame/EditGame";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<StartSpilForside />} />
          <Route path="/create-game" element={<NameGame />} />
          <Route path="/create-category" element={<CreateNewCategory />} />
          <Route path="/game-created" element={<GameCreated />} />
          <Route path="/add-team" element={<AddTeam />} />
          {/* To be removed when page works */}
          <Route path="/add-team/:gameId" element={<AddTeam />} />
          <Route path="/choose-game" element={<ChooseGame />} />
          <Route path="/jeopardy" element={<Jeopardy />} />
          {/* To be removed when page works */}
          <Route path="/jeopardy/:gameId" element={<Jeopardy />} />
          <Route path="/edit-game" element={<EditGame />} />
          <Route path="/edit-game/:gameId" element={<EditGame />} />
          <Route path="/game-created/:gameId" element={<GameCreated />} />
        </Routes>
      </main>

      <Footer />

      <ToastContainer />
    </div>
  );
}
