import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import styles from "./EditGame.module.css";
import {useNavigate} from "react-router-dom";

export default function EditGame() {

const navigate = useNavigate();
 const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [questions, setQuestions] = useState([
    { points: 100, question: "", answer: "" },
    { points: 200, question: "", answer: "" },
    { points: 400, question: "", answer: "" },
    { points: 800, question: "", answer: "" },
    { points: 1000, question: "", answer: "" },
  ]);

  useEffect(() => {
      const savedGames = JSON.parse(localStorage.getItem("games") || "[]");
      setGames(savedGames);
    }, []);
  
    const saveCategory = () => {
      const editCategory = {
        game: selectedGame,
        categoryName,
        questions,
      };
  
      const saved = JSON.parse(localStorage.getItem("categories") || "[]");
      saved.push(editCategory);
  
      localStorage.setItem("categories", JSON.stringify(saved));
  
      navigate("/game-created");
    };
  
    const updateQuestion = (index, key, value) => {
      const updated = [...questions];
      updated[index][key] = value;
      setQuestions(updated);
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.form}>
  
          <h2>ændere dine kalgoriere</h2>
  
          <div>
  
          
          <select 
            className={styles.selectGame}
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="">vælg kalgoriere</option>
            {games.map((game, index) => (
              <option key={index} value={game}>{game}</option>
            ))}
          </select>
          
          
          
          </div>
  
  
  
          <div className={styles.inputCategory}>
          
  
          
          <input 
            type="text"
            placeholder=" ændere Kategorinavn...."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          /></div>
  
          
          {questions.map((q, index) => (
            <div key={index} className={styles.formNext}>
              {q.points}
              <input
                placeholder="ændere svar..."
                value={q.answer}
                onChange={(e) => updateQuestion(index, "answer", e.target.value)}
              />
              <input
                placeholder="ændere spørgsmål..."
                value={q.question}
                onChange={(e) => updateQuestion(index, "question", e.target.value)}
              />
            </div>
          ))}
  
          <Button buttonText="update" onButtonClick={saveCategory} />
        </div>
      </div>
    );
  }