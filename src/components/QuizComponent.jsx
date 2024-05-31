import { useState, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../context/UserState";

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
  const [selectedOption, setSelectedOption] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [score, setScore] = useState(0);

  const { user, setUserScore } = useContext(userContext);

  useEffect(() => {
    if (questions && questions.length > 0) {
      let currentQuestionObject = questions[index];
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

        setCorrectOption(currentQuestionObject.correct_answer);
        setOptions(shuffle(allOptions));
        console.log(
          currentQuestionObject.question,
          `answer: ${currentQuestionObject.correct_answer}`
        );
      }
    }

    setSelectedOption("");
  }, [questions, index]);

  // const incrementScore = () => {
  //   console.log(selectedOption)
  //   if(selectedOption === correctOption){
  //       setScore(score += 1)
  //   }

  //   console.log(score)
  // }

  // // fix problem here!!!!!
  const handleOptionClick = (e) => {
    let value = e.target.textContent;
    console.log(value.slice(3));
    setSelectedOption(value.slice(3));

    // console.log(value.slice(3))
  };

  // Algorithm to check track user score
  /*
    store user selected option
    when next button is clicked:
      if user selected option == correctAnswer:
        increment score
  */

  return (
    <>
      <p className="question white"> {currentQuestion}</p>
      <div className="options">
        <p className="option white" onClick={handleOptionClick}>
          A. {options[0]}
        </p>
        <p className="option white" onClick={handleOptionClick}>
          B. {options[1]}
        </p>
        <p className="option white" onClick={handleOptionClick}>
          C. {options[2]}
        </p>
        <p className="option white" onClick={handleOptionClick}>
          D. {options[3]}
        </p>
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
