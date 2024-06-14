import { shuffle } from "./QuizComponent";
import { letters } from "./QuizComponent";
import { parseString, quizContext } from "../context/QuizState";
import "./componentStyles/answer-component.css";
import { useContext } from "react";

export default function AnswerComponent({ question, index }) {
  const { userAnswers } = useContext(quizContext);

  const answers = userAnswers.length === 0 ? JSON.parse(localStorage.getItem("user-answers")) : userAnswers;
  

  let allOptions = shuffle([
    ...question.incorrect_answers,
    question.correct_answer,
  ]);

  return (
    <div className="box">
      <h2>Question {index + 1}</h2>
      <p className="white question">{parseString(question.question)}</p>
      {allOptions.map((option, i) => {
        const isCorrect = option === question.correct_answer;
        const isSelected = answers[index] === option;
        
        return (
          <p
            key={i}
            className={`white ans-option ${
              isCorrect ? "green" : isSelected ? "red" : ""
            }`}
          >
            {letters[i]} {parseString(option)}
          </p>
        );
      })}
    </div>
  );
}
