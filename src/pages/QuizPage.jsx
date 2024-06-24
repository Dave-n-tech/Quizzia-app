import React, { useContext, useEffect, useState } from "react";
import { quizContext } from "../context/QuizState";
import "./pageStyles/quizpage.css";
import QuizComponent from "../components/QuizComponent";
import { parseString } from "../context/QuizState";

export default function QuizPage() {
  const { questions, getQuestions, loading, error } = useContext(quizContext);
  const [index, setIndex] = useState(0);

  let questionGroup = questions[index];

  let hasNext = index < questions.length - 1;
  let hasPrev = index > 0;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="center error">Error: {error.message}</div>;

  return (
    <main className="container">
      <section className="question-container">
        <h2>Category: {parseString(questionGroup?.category)}</h2>
        <h2>Difficulty: {questionGroup?.difficulty}</h2>
        <h2>Question {index + 1} / {questions.length}</h2>
        <QuizComponent
          questions={questions}
          index={index}
          onNextClick={handleNextClick}
          onPrevClick={handlePrevClick}
        />
      </section>
    </main>
  );
}
