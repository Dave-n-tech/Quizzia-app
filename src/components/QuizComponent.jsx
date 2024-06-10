import { useState, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../context/UserState";
import { useNavigate } from "react-router-dom";
import { parseString, quizContext } from "../context/QuizState";

export const letters = ["A.", "B.", "C.", "D."];

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const QuizComponent = ({ questions, index, onNextClick, onPrevClick }) => {
  const [options, setOptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const { setUserScore } = useContext(userContext);
  const { userAnswers, setUserAnswers } = useContext(quizContext);
  const navigate = useNavigate();

  //useful constants
  const currentQuestionObject = questions[index];

  useEffect(() => {
    if (questions && questions.length > 0) {
      if (currentQuestionObject) {
        const formattedQuestion = parseString(currentQuestionObject.question);

        setCurrentQuestion(formattedQuestion);

        const allOptions = [
          ...currentQuestionObject.incorrect_answers,
          currentQuestionObject.correct_answer,
        ];

        setOptions(shuffle(allOptions));
        console.log(
          currentQuestionObject.question,
          `answer: ${currentQuestionObject.correct_answer}`
        );
      }
    }
  }, [questions, index]);

  // const handleOptionClick = (option) => {
  //   const newUserAnswers = [...userAnswers];
  //   newUserAnswers[index] = option;
  //   setUserAnswers(newUserAnswers);
  //   console.log("selected answer:", newUserAnswers);
  // };

  const handleOptionChange = (e) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[index] = e.target.value;
    setUserAnswers(newUserAnswers);
    console.log("selected answer:", newUserAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correct_answer) {
        score++;
      }
    }
    return score;
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    setUserScore(score);
    localStorage.setItem("user-answers", JSON.stringify(userAnswers))
    navigate("/result");
  };

  // console.log(userAnswers);
  // console.log(options);

  // className={`option white ${
  //   userAnswers[index] === option ? `selected` : ""
  // }`}
  // onClick={() => handleOptionClick(option)}

  return (
    <>
      <p className="question white"> {currentQuestion}</p>
      <div className="options">
        {options.map((option, i) => (
          <label key={i} className={`option white`}>
            <input
              type="radio"
              name="quiz-option"
              value={option}
              checked={userAnswers[index] === option}
              onChange={handleOptionChange}
            />
            {letters[i]} {parseString(option)}
          </label>
        ))}
      </div>

      <div className="nav-buttons">
        <button
          className={`button ${index === 0 ? "hidden" : ""}`}
          onClick={onPrevClick}
        >
          Prev
        </button>
        <button
          className={`button ${index !== questions.length - 1 ? "hidden" : ""}`}
          onClick={handleSubmitQuiz}
        >
          Submit
        </button>
        <button
          className={`button ${index === questions.length - 1 ? "hidden" : ""}`}
          onClick={onNextClick}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default QuizComponent;
