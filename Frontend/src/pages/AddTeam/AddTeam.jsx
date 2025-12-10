import { useEffect, useState } from "react";
import { fetchAllTeams } from "../../hooks/fetch";
import CreateTeam from "../../components/CreateTeam/CreateTeam";
import ChooseTeam from "../../components/ChooseTeam/ChooseTeam";
import styles from "./AddTeam.module.css";

export default function AddTeam() {
  const [teams, setTeams] = useState([]);

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

  return (
    <div className={styles.containerStylesTeam}>
      <div className={styles.chooseTeamContainer}>
        <ChooseTeam teams={teams} />
      </div>
      <div className={styles.createTeamContainer}>
        <CreateTeam onCreateTeam={handleCreateTeam} />
      </div>
    </div>
  );
}
