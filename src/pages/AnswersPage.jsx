import { useContext } from "react";
import AnswerComponent from "../components/AnswerComponent";
import { quizContext } from "../context/QuizState";
import "./pageStyles/answerspage.css"
import { useNavigate } from "react-router-dom";

export default function AnswersPage() {
  const { questions } = useContext(quizContext);
  const navigate = useNavigate()

  return (
    <main className="container">
      <section className="answers-container">
        <h1>Answers</h1>
        <div className="answers">
          {questions.map((question, index) => {
            return <AnswerComponent key={index} question={question} index={index}/>
          })}
        </div>
        <button className="button" onClick={() => navigate("/result")}>Back</button>
      </section>
    </main>
  );
}
