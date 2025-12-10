import { useEffect, useState } from "react";
import { fetchTeamImages, createTeam } from "../../hooks/fetch";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import styles from "./CreateTeam.module.css";

export default function CreateTeam({ onCreateTeam }) {
  const [teamName, setTeamName] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // ==== HENT BILLEDER ======
  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchTeamImages();
        setImages(data);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    loadImages();
  }, []);

  // ===== OPRET HOLD =====

  const handleSubmit = async () => {
    if (!teamName || !selectedImage) return;

    try {
      const newTeam = {
        name: teamName,
        image: selectedImage,
      };

      const savedTeamResponse = await createTeam(newTeam);

      // If your API wraps the team in `data`
      const savedTeam = savedTeamResponse.data || savedTeamResponse;

      toast.success("Holdet er oprettet!");
      console.log("Team created:", savedTeam);

      if (onCreateTeam) {
        onCreateTeam(savedTeam);
      }

      setTeamName("");
      setSelectedImage(null);
    } catch (err) {
      console.error("Error creating team:", err);
    }
  };

  return (
    <div className={styles.createTeam}>
      <div className={styles.headerContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Skriv holdnavn..."
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
      </div>

      <div className={styles.imageGrid}>
        {images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            className={selectedImage === img.url ? styles.selected : ""}
            onClick={() => setSelectedImage(img.url)}
            alt="Team billede"
          />
        ))}
      </div>

      <Button
        onButtonClick={handleSubmit}
        disabled={!teamName || !selectedImage}
        buttonText="Tilføj hold"
      />
    </div>
  );
}
