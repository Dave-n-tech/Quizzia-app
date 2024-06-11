import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/UserState";
import { quizContext } from "../context/QuizState";
import ribbon from "../assets/ribbons.png";
import "./pageStyles/resultpage.css";

export default function ResultPage() {
  const { user } = useContext(userContext);
  const { questions } = useContext(quizContext);

  const navigate = useNavigate()
  const userScore = JSON.parse(localStorage.getItem("userscore"))
  const userName = JSON.parse(localStorage.getItem("username"))

  const handleRestart = () => {
    localStorage.clear()
    navigate("/user-info")
  }

  return (
    <main className="container">
      <section className="result-display-container">
        <h1>Congratulations {!user.name ? userName : user.name}!</h1>
        <img src={ribbon} alt="ribbon icon" className="congrats-img" />
        <div className="score">
          <p>You scored:</p>
          <h2>
            {user.score === 0 ? userScore : user.score}/{questions.length}
          </h2>
        </div>
        <div className="buttons">
          <button className="button" onClick={handleRestart}>Restart</button>
          <button className="button" onClick={() => navigate("/answers")}>View Answers</button>
        </div>
      </section>
    </main>
  );
}
