import styles from "./CreateNewCategory.module.css";
import Button from "../../components/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = "https://jeopardy-gkiyb.ondigitalocean.app";

export default function CreateNewCategory() {
  const navigate = useNavigate();
  const location = useLocation();

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([
    { points: 100, question: "", answer: "" },
    { points: 200, question: "", answer: "" },
    { points: 300, question: "", answer: "" },
    { points: 400, question: "", answer: "" },
    { points: 500, question: "", answer: "" },
  ]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${API_URL}/games`);
        const json = await res.json();

        const list = Array.isArray(json.data) ? json.data : [];
        setGames(list);

        if (location.state?.gameId) {
          const newId = location.state.gameId;
          const exists = list.some((g) => g._id === newId);
          if (exists) setSelectedGame(newId);
        }
      } catch (err) {
        console.error("Kunne ikke hente spil:", err);
      }
    };

    fetchGames();
  }, []);

  const navigateGameCreated = () => {
    navigate(`/game-created/${selectedGame}`);
  };

  const goNext = () => {
    if (!selectedGame) {
      alert("Vælg et spil først.");
      return;
    }

    if (!categoryName.trim()) {
      alert("Skriv et kategorinavn.");
      return;
    }

    const key = `customCategories-${selectedGame}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];

    const newCategory = {
      _id: `local-category-${Date.now()}`,
      name: categoryName,
      questions: questions.map((q, index) => ({
        _id: `local-question-${Date.now()}-${index}`,
        value: q.points,
        question: q.question, 
        answer: q.answer,     
        answered: false,
      })),
    };

    localStorage.setItem(key, JSON.stringify([...existing, newCategory]));
    navigateGameCreated();
  };

  const updateQuestion = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Skab ny kategori</h2>

        <select
          className={styles.selectGame}
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
        >
          <option value="">Vælg spil</option>
          {games.map((game) => (
            <option key={game._id} value={game._id}>
              {game.name}
            </option>
          ))}
        </select>

        <div className={styles.inputCategory}>
          <input
            type="text"
            placeholder="Kategorinavn..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        
        {questions.map((q, index) => (
          <div key={index} className={styles.formNext}>
            {q.points}

            <input
              placeholder="spørgsmål..."
              value={q.question}
              onChange={(e) =>
                updateQuestion(index, "question", e.target.value)
              }
            />

            <input
              placeholder="svar..."
              value={q.answer}
              onChange={(e) =>
                updateQuestion(index, "answer", e.target.value)
              }
            />
          </div>
        ))}

        <Button buttonText="Tilføj" onButtonClick={goNext} />
      </div>
    </div>
  );
}