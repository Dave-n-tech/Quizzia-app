import { useState, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../context/UserState";
import { useNavigate } from "react-router-dom";

function shuffle(array) {
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
  const [userAnswers, setUserAnswers] = useState([]);
  const { user, setUserScore } = useContext(userContext);
  const navigate = useNavigate()

  //useful constants
  const letters = ['A.', 'B.', 'C.', 'D.']
  const currentQuestionObject = questions[index];
  const correctOption = currentQuestionObject?.correct_answer;


  useEffect(() => {
    if (questions && questions.length > 0) {
      
      if (currentQuestionObject) {
        // Decode the question text
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(
          `<!doctype html><body>${currentQuestionObject.question}`,
          "text/html"
        ).body.textContent;

        setCurrentQuestion(decodedString);

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

  const handleOptionClick = (option) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[index] = option;
    setUserAnswers(newUserAnswers)
  };

  const calculateScore = () => {
    let score = 0
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correct_answer) {
        score++;
      }
    }
    return score;
  }

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    setUserScore(score)
    navigate("/result")
  };



  return (
    <>
      <p className="question white"> {currentQuestion}</p>
      <div className="options">
        {options.map((option, i) => (
          <p key={i} className={`option white ${userAnswers[index] === option ? `selected` : ''}`} onClick={() => handleOptionClick(option)}>
          {letters[i]} {option}
        </p>
        ))}
      </div>

      <div className="nav-buttons">
        <button
          className={`button ${index === 0 ? "hidden" : ""}`}
          onClick={onPrevClick}
        >
          {" "}
          Prev{" "}
        </button>
        <button
          className={`button ${index !== questions.length - 1 ? "hidden" : ""}`}
          onClick={handleSubmitQuiz}
        >
          {" "}
          Submit{" "}
        </button>
        <button
          className={`button ${index === questions.length - 1 ? "hidden" : ""}`}
          onClick={onNextClick}
        >
          {" "}
          Next{" "}
        </button>
      </div>
    </>
  );
};

export default QuizComponent;
