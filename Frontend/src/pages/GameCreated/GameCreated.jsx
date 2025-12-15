import styles from "./GameCreated.module.css";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

export default function GameCreated() {
  const navigate = useNavigate();
  const { gameId } = useParams();

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
        <p>Du har nu skabt et spil med 6 kategorier</p>

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

const loadGame = async () => {
  try {
    setLoading(true);
    setError(null);

    const data = await fetchGameById(gameId);
    const gameData = data.data || data;

    setGame(gameData);
    setTeams(gameData.teams || []);

    const backendCategories = Array.isArray(gameData.categories)
      ? gameData.categories
      : [];

    const localKey = `customCategories-${gameId}`;
    const localCategories = JSON.parse(localStorage.getItem(localKey)) || [];

    setCategories([...backendCategories, ...localCategories]);
  } catch (err) {
    console.error("Error when fetching game:", err);
    setError("Kunne ikke hente spillet");
  } finally {
    setLoading(false);
  }
};
