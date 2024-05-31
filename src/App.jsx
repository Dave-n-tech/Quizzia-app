import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserInfoPage from "./pages/UserInfoPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import AnswersPage from "./pages/AnswersPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-info" element={<UserInfoPage />} />
        <Route path="/quiz/:category/:difficulty/" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/answers" element={<AnswersPage />} />
      </Routes>
    </>
  );
}

export default App;
