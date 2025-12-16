import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import styles from "./EditGame.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGameById } from "../../hooks/fetch";
 
export default function EditGame() {
  const navigate = useNavigate();
  const { gameId } = useParams(); // Get gameId from URL
  const [game, setGame] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
 
  const [questions, setQuestions] = useState([]);
 
  // Load game and categories (similar to Jeopardy.jsx)
  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        // Fetch game from API
        const data = await fetchGameById(gameId);
        const gameData = data.data || data;
        setGame(gameData);
 
        // Get backend categories
        const backendCategories = Array.isArray(gameData.categories)
          ? gameData.categories
          : [];
 
        // Get localStorage categories
        const localKey = `customCategories-${gameId}`;
        const localCategories = JSON.parse(
          localStorage.getItem(localKey)
        ) || [];
 
        // Combine both and mark source
        const allCategories = [
          ...backendCategories.map(cat => ({ ...cat, source: 'api' })),
          ...localCategories.map(cat => ({ ...cat, source: 'local' }))
        ];
 
        setCategories(allCategories);
      } catch (err) {
        console.error("Error fetching game:", err);
        alert("Kunne ikke hente spillet");
      } finally {
        setLoading(false);
      }
    };
 
    if (gameId) {
      loadGame();
    }
  }, [gameId]);
 
  // When a category is selected, populate the form
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat._id === selectedCategory);
      if (category) {
        setCategoryName(category.name);
        // Map questions with their actual point values from the category
        const mappedQuestions = category.questions.map(q => ({
          points: q.value,
          question: q.question,
          answer: q.answer,
          _id: q._id // Keep the ID for updates
        }));
        setQuestions(mappedQuestions);
      }
    } else {
      // Reset form when no category selected
      setCategoryName("");
      setQuestions([]);
    }
  }, [selectedCategory, categories]);
 
  const saveCategory = async () => {
    if (!selectedCategory) {
      alert("Vælg en kategori først");
      return;
    }
 
    if (!categoryName.trim()) {
      alert("Kategorinavnet må ikke være tomt");
      return;
    }
 
    const category = categories.find(cat => cat._id === selectedCategory);
    if (category.source === 'local') {
      // Update localStorage category
      const localKey = `customCategories-${gameId}`;
      const localCategories = JSON.parse(localStorage.getItem(localKey)) || [];
      const updatedCategories = localCategories.map(cat => {
        if (cat._id === selectedCategory) {
          return {
            ...cat,
            name: categoryName,
            questions: questions.map(q => ({
              _id: q._id || `local-question-${Date.now()}-${Math.random()}`,
              value: q.points, // Keep the original point value
              question: q.question,
              answer: q.answer,
              answered: false,
            }))
          };
        }
        return cat;
      });
      localStorage.setItem(localKey, JSON.stringify(updatedCategories));
      alert("Kategori opdateret!");
      navigate(`/game-created/${gameId}`);
    } else {
      // Update API category
      try {
        const response = await fetch(`https://jeopardy-gkiyb.ondigitalocean.app/category/${selectedCategory}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: selectedCategory,
            name: categoryName,
            questions: questions.map(q => ({
              _id: q._id,
              value: q.points, // Keep the original point value
              question: q.question,
              answer: q.answer,
              answered: false,
            }))
          }),
        });
 
        if (response.ok) {
          alert("Kategori opdateret!");
          navigate(`/game-created/${gameId}`);
        } else {
          alert("Fejl ved opdatering af kategori");
        }
      } catch (error) {
        console.error('Error saving category:', error);
        alert("Fejl ved opdatering af kategori");
      }
    }
  };
 
  const updateQuestion = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };
 
  if (loading) {
    return (
<div className={styles.container}>
<div className={styles.form}>
<h2>Indlæser...</h2>
</div>
</div>
    );
  }
 
  return (
<div className={styles.container}>
<div className={styles.form}>
<h2>Opdatér dine kategorier</h2>
<p>Spil: {game?.name}</p>
 
        <div>
<select
            className={styles.selectGame}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
>
<option value="">vælg kategori</option>
            {categories.map((category) => (
<option key={category._id} value={category._id}>
                {category.name} ({category.source === 'local' ? 'Custom' : 'API'})
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
 
        {questions.length > 0 ? (
          questions.map((q, index) => (
<div key={index} className={styles.formNext}>
<span>{q.points}</span>
<input
                placeholder="Opdatér spørgsmål..."
                value={q.question}
                onChange={(e) =>
                  updateQuestion(index, "question", e.target.value)
                }
              />
<input
                placeholder="Opdatér svar..."
                value={q.answer}
                onChange={(e) => updateQuestion(index, "answer", e.target.value)}
              />
</div>
          ))
        ) : (
<p style={{ textAlign: 'center', padding: '20px' }}>
            Vælg en kategori for at redigere
</p>
        )}
 
        <Button buttonText="Opdatér" onButtonClick={saveCategory} />
</div>
</div>
  );
}
