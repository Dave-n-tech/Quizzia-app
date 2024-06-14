import { createContext, useEffect, useState } from "react";

export const quizContext = createContext();

export const parseString = (string) => {
  // Decode the question text
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(
    `<!doctype html><body>${string}`,
    "text/html"
  ).body.textContent;

  return decodedString;
};

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions");

    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const getQuestions = async (category, difficulty) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch! please try again");
      }

      const data = await response.json();
      setQuestions(data.results);

      if (data.response_code === 1) {
        throw new Error(
          "Questions are unavailable! please try another category"
        );
      }

      localStorage.setItem("questions", JSON.stringify(data.results));
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <quizContext.Provider
      value={{
        userAnswers,
        setUserAnswers,
        getQuestions,
        questions,
        setQuestions,
        loading,
        error,
      }}
    >
      {children}
    </quizContext.Provider>
  );
};
