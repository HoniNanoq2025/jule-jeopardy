import styles from "./GameCreated.module.css";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGameById } from "../../hooks/fetch";

export default function GameCreated() {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [categoryCount, setCategoryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryCount = async () => {
      try {
        setLoading(true);

        // Hent kategorier fra backend
        const data = await fetchGameById(gameId);
        const gameData = data.data || data;
        const backendCategories = Array.isArray(gameData.categories)
          ? gameData.categories
          : [];

        // Hent lokale kategorier fra localStorage
        const localKey = `customCategories-${gameId}`;
        const localCategories =
          JSON.parse(localStorage.getItem(localKey)) || [];

        // Beregn total antal kategorier
        const totalCount = backendCategories.length + localCategories.length;
        setCategoryCount(totalCount);
      } catch (err) {
        console.error("Kunne ikke hente kategorier:", err);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      loadCategoryCount();
    }
  }, [gameId]);

  const navigateAddTeam = () => {
    navigate(`/add-team/${gameId}`);
  };

  const navigateCategory = () => {
    navigate("/create-category", {
      state: { gameId },
    });
  };

  return (
    <div className={styles.nameGame}>
      <div className={styles.gamediv}>
        {loading ? (
          <p>Henter kategorier...</p>
        ) : (
          <p>
            Du har nu skabt et spil med {categoryCount}{" "}
            {categoryCount === 1 ? "kategori" : "kategorier"}
          </p>
        )}

        <div>
          <Button
            buttonText="Start spil"
            onButtonClick={navigateAddTeam}
            btnSize={styles.startGameBtn}
          />
        </div>

        <div>
          <Button
            buttonText="Skab ny kategori"
            onButtonClick={navigateCategory}
            btnSize={styles.createCategoryBtn}
          />
        </div>
      </div>
    </div>
  );
}
