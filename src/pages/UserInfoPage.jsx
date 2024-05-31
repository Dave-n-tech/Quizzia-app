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
  const navigate = useNavigate();

  const { user, saveUserName } = useContext(userContext);
  const { getQuestions } = useContext(quizContext);

  const difficulties = ["easy", "medium", "hard"];

  const baseUrl = "https://opentdb.com/api_category.php";

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await fetch(baseUrl);
        const response = await data.json();
        setCategories(response.trivia_categories);
      } catch (error) {
        console.error(error);
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
    console.log(
      `category: ${selectedCategory}, difficulty: ${selectedDifficulty}`
    );
    navigate(`/quiz/${selectedCategory}/${selectedDifficulty}/`);
    getQuestions(selectedCategory, selectedDifficulty);
  };

  //user.name ? user.name : localStorage.getItem("username")

  return (
    <main>
      <h1>Hello {user.name}</h1>
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
          {categories.map((category) => {
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
          })}
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
