import { useState } from "react";
import { addTeams } from "../../hooks/fetch";
import { toast } from "react-toastify";
import styles from "./ChooseTeam.module.css";
import Button from "../Button/Button";

export default function ChooseTeam({ teams, onChooseTeam, gameId }) {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toggle team selection (multi-select)
  // Denne funktion håndterer når et team klikkes - tilføjer eller fjerner det fra valgte teams
  const toggleTeamSelection = (team) => {
    setSelectedTeams((prev) => {
      // Tjek om teamet allerede er valgt ved at sammenligne _id
      // .some() returnerer true hvis mindst ét element matcher betingelsen
      const isSelected = prev.some((t) => t._id === team._id);

      if (isSelected) {
        // Hvis teamet allerede er valgt, fjern det fra listen
        // .filter() beholder kun teams der IKKE matcher det klikkede team
        return prev.filter((t) => t._id !== team._id);
      } else {
        // Hvis teamet ikke er valgt, tilføj det til listen
        // Spread operator [...prev, team] laver en ny array med alle eksisterende + det nye team
        return [...prev, team];
      }
    });
  };

  const handleChoose = async () => {
    if (!selectedTeams || selectedTeams.length === 0) {
      toast.error("Vælg mindst ét hold");
      return;
    }

    // Hvis gameId er givet, tilføj teams til spillet
    if (gameId) {
      try {
        setLoading(true);

        const teamIds = selectedTeams.map((team) => team._id);

        // Prøv forskellige strukturer
        await addTeams(gameId, { teamIds: teamIds });
        toast.success("Hold tilføjet til spillet!");

        // Kald callback hvis den findes
        if (onChooseTeam) onChooseTeam(selectedTeams);
      } catch (err) {
        console.error("Error adding teams to game:", err);
        toast.error("Kunne ikke tilføje hold til spillet");
      } finally {
        setLoading(false);
      }
    } else {
      // Bare send teams tilbage hvis intet gameId
      if (onChooseTeam) onChooseTeam(selectedTeams);
    }
  };

  return (
    <div className={styles.chooseTeam}>
      <h2>Vælg hold</h2>

      <div className={styles.teamList}>
        {teams.map((team) => (
          <div
            key={team._id}
            className={`${styles.teamItem} ${
              selectedTeams && selectedTeams.some((t) => t._id === team._id)
                ? styles.selected
                : ""
            }`}
            onClick={() => toggleTeamSelection(team)}
          >
            <img src={team.image} alt={team.name} />
            <p>{team.name}</p>
          </div>
        ))}
      </div>

      <div className={styles.selectedCount}>
        {selectedTeams && selectedTeams.length > 0 && (
          <p>{selectedTeams.length} hold valgt</p>
        )}
      </div>

      <Button
        onButtonClick={handleChoose}
        disabled={!selectedTeams || selectedTeams.length === 0 || loading}
        buttonText={loading ? "Tilføjer..." : "Bekræft valg"}
      />
    </div>
  );
}
