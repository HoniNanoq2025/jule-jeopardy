import styles from "./AddTeam.module.css";
import CreateTeam from "../../components/CreateTeam/CreateTeam";

export default function AddTeam() {
  return (
    <div className={styles.containerStylesTeam}>
      <div className={styles.createTeamContainer}>
        <CreateTeam />
      </div>
    </div>
  );
}
