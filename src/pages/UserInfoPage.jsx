import { useContext, useEffect } from "react";
import { useState } from "react";
import "./pageStyles/userinfopage.css";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserState";
import { quizContext } from "../context/QuizState";

export default function UserInfoPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { user, saveUserName } = useContext(userContext);
  const { getQuestions } = useContext(quizContext);

  const difficulties = ["easy", "medium", "hard"];

  const baseUrl = "https://opentdb.com/api_category.php";

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch! please try again");
        }

        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const selectCategory = (id) => {
    setSelectedCategory(id);
  };

  const selectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleInputName = (e) => {
    e.preventDefault();

    saveUserName(e.target.value);
  };

  const startQuiz = (e) => {
    e.preventDefault();
    getQuestions(selectedCategory, selectedDifficulty);
    navigate(`/quiz/${selectedCategory}/${selectedDifficulty}/`);
  };

  return (
    <main className="quiz-info-container">
      <h1 className="hello-user">Hello {user.name}</h1>
      <section className="name-section">
        <form className="name-input">
          <h1>What's your name?</h1>
          <input
            type="text"
            placeholder="what's your name?"
            onChange={handleInputName}
            required
          />
        </form>
        <div className="difficulty-input">
          <h1>Select Difficulty</h1>
          <div className="difficulty-select">
            {difficulties.map((diff) => {
              return (
                <button
                  key={diff}
                  className={`difficulty-button ${
                    selectedDifficulty === diff ? "difficulty-active" : ""
                  }`}
                  value={diff}
                  onClick={() => selectDifficulty(diff)}
                >
                  {diff}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="category-section">
        <h1>Select Category</h1>
        <div className="categories">
          {loading ? (
            <p className="center">Loading categories...</p>
          ) : (
            categories.map((category) => {
              return (
                <button
                  className={`category-btn button ${
                    selectedCategory === category.id ? "btn-active" : ""
                  }`}
                  key={category.id}
                  onClick={() => {
                    selectCategory(category.id);
                  }}
                >
                  {category.name}
                </button>
              );
            })
          )}
          {error && <p className="center error">{error.message}</p>}
        </div>

        <div className="start">
          <button
            className={`start-btn button ${
              selectedCategory === "" ? "inactive" : ""
            }`}
            onClick={startQuiz}
          >
            start
          </button>
        </div>
      </section>
    </main>
  );
}
