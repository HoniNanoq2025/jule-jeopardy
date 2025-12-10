import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllTeams } from "../../hooks/fetch";
import CreateTeam from "../../components/CreateTeam/CreateTeam";
import ChooseTeam from "../../components/ChooseTeam/ChooseTeam";
import Button from "../../components/Button/Button";
import styles from "./AddTeam.module.css";

export default function AddTeam() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [teamsAdded, setTeamsAdded] = useState(false);

  // Hent alle teams
  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchAllTeams();
        setTeams(data.data); // data.data indeholder teams
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };

    loadTeams();
  }, []);

  // Callback til når der skabes et nyt team
  const handleCreateTeam = (newTeam) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  const handleTeamsAdded = () => {
    setTeamsAdded(true);
  };

  // Start spillet (teams er allerede tilføjet via ChooseTeam)
  const handleStartGame = () => {
    navigate(`/jeopardy/${gameId}`);
  };

  return (
    <div className={styles.containerStylesTeam}>
      <div className={styles.componentsContainer}>
        <div className={styles.chooseTeamContainer}>
          <ChooseTeam
            teams={teams}
            onChooseTeam={handleTeamsAdded}
            gameId={gameId}
          />
        </div>
        <div className={styles.createTeamContainer}>
          <CreateTeam onCreateTeam={handleCreateTeam} />
        </div>
      </div>

      <div className={styles.startGame}>
        {gameId && teamsAdded && (
          <div className={styles.startButtonContainer}>
            <Button
              onButtonClick={handleStartGame}
              buttonText="Start spillet"
              btnSize={styles.startGameBtn}
            />
          </div>
        )}
      </div>
    </div>
  );
}
