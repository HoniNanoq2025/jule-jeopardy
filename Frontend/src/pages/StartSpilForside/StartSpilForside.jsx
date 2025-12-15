import styles from "./StartSpilForside.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function StartSpilForside() {
  const navigate = useNavigate();

  const navigateToNewgame = () => {
    navigate("/create-game");
  };

  const navigateToSaved = () => {
    navigate("/choose-game");
  };

  return (
    <div className={styles.Home}>
      <div className={styles.Homediv}>
        <div>
          <Button
            buttonText="skab nyt spil"
            onButtonClick={navigateToNewgame}
            btnSize={styles.startGameBtn}
          />
        </div>

        <div>
          <Button
            buttonText="vælg eksisterende spil"
            onButtonClick={navigateToSaved}
            btnSize={styles.chooseGameBtn}
          />
        </div>
      </div>
    </div>
  );
}
