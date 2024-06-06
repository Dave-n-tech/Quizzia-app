import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserState";
import { useParams } from "react-router-dom";
import { quizContext } from "../context/QuizState";
import "./pageStyles/quizpage.css"
import QuizComponent from "../components/QuizComponent";

export default function QuizPage() {
  const { user } = useContext(userContext);
  const { category, difficulty } = useParams();
  const { questions, getQuestions, loading, error } = useContext(quizContext);
  const [index, setIndex] = useState(0)

  let questionGroup = questions[index]

  let hasNext = index < questions.length - 1;
  let hasPrev = index > 0;


  function handleNextClick() {
    if(hasNext){
      setIndex(index + 1);
    }
  }

  function handlePrevClick() {
    if(hasPrev){
      setIndex(index - 1)
    }
  }


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="container">
      <section className="question-container">
        <h2>Category: {questionGroup?.category}</h2>
        <h2>Question {index + 1}</h2>
        <QuizComponent questions={questions} index={index} onNextClick = {handleNextClick} onPrevClick = {handlePrevClick}/>
      </section>
    </main>
  );
}
