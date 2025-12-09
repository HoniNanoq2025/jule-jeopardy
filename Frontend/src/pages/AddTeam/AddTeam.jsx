import styles from "./AddTeam.module.css";
import CreateTeam from "../../components/CreateTeam/CreateTeam";
import ChooseTeam from "../../components/ChooseTeam/ChooseTeam";

export default function AddTeam() {
  return (
    <div className={styles.containerStylesTeam}>
      <div className={styles.chooseTeamContainer}>
        <ChooseTeam />
      </div>
      <div className={styles.createTeamContainer}>
        <CreateTeam />
      </div>
    </div>
  );
}
