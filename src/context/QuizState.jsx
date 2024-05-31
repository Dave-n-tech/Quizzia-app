import { createContext, useEffect, useState } from "react";

export const quizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions")
    console.log(JSON.parse(savedQuestions))

    if(savedQuestions){
      setQuestions(JSON.parse(savedQuestions));
    }
  }, [])

  const getQuestions = async (category, difficulty) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setQuestions(data.results)
      localStorage.setItem("questions", JSON.stringify(data.results))

    } catch (error) {
      setError(error);
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  return <quizContext.Provider value={{getQuestions, questions, setQuestions, loading, error}}>{children}</quizContext.Provider>;
};
