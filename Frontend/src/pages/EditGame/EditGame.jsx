import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import styles from "./EditGame.module.css";
import { useNavigate } from "react-router-dom";

export default function EditGame() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [questions, setQuestions] = useState([
    { points: 100, question: "", answer: "" },
    { points: 200, question: "", answer: "" },
    { points: 400, question: "", answer: "" },
    { points: 800, question: "", answer: "" },
    { points: 1000, question: "", answer: "" },
  ]);

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category) {
        setCategoryName(category.categoryName);
        setQuestions(category.questions);
      }
    } else {
      setCategoryName("");
      setQuestions([
        { points: 100, question: "", answer: "" },
        { points: 200, question: "", answer: "" },
        { points: 400, question: "", answer: "" },
        { points: 800, question: "", answer: "" },
        { points: 1000, question: "", answer: "" },
      ]);
    }
  }, [selectedCategory, categories]);

  const saveCategory = () => {
    const editCategory = {
      id: selectedCategory,
      categoryName,
      questions,
    };

    fetch('/api/categories', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editCategory),
    })
      .then(response => response.json())
      .then(() => navigate("/game-created"))
      .catch(error => console.error('Error saving category:', error));
  };

  const updateQuestion = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Opdatér dine kategorier</h2>

        <div>
          <select
            className={styles.selectGame}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">vælg kategori</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputCategory}>
          <input
            type="text"
            placeholder="Opdatér Kategorinavn...."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        {questions.map((q, index) => (
          <div key={index} className={styles.formNext}>
            {q.points}
            <input
              placeholder="Opdatér svar..."
              value={q.answer}
              onChange={(e) => updateQuestion(index, "answer", e.target.value)}
            />
            <input
              placeholder="Opdatér spørgsmål..."
              value={q.question}
              onChange={(e) =>
                updateQuestion(index, "question", e.target.value)
              }
            />
          </div>
        ))}

        <Button buttonText="Opdatér" onButtonClick={saveCategory} />
      </div>
    </div>
  );
}
