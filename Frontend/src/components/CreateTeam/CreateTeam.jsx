import { useEffect, useState } from "react";
import styles from "./CreateTeam.module.css";
import Button from "../Button/Button";

export default function CreateTeam({ onCreateTeam }) {
  const [teamName, setTeamName] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("https://jeopardy-gkiyb.ondigitalocean.app/teams/images")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); 
        setImages(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSubmit = () => {
    if (!teamName || !selectedImage) return;

    const newTeam = {
      name: teamName,
      image: selectedImage
    };

    onCreateTeam(newTeam);
    setTeamName("");
    setSelectedImage(null);
  };

  return (
      <div className={styles.createTeam}>
      <h2>Hold navn</h2>

      <input
        type="text"
        placeholder="Skriv holdnavn..."
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <div className={styles.imageGrid}>

        {images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            className={selectedImage === img.url ? styles.selected : ""}
            onClick={() => setSelectedImage(img.url)}
          />
        ))}
      </div>

      <Button onButtonClick={handleSubmit} disabled={!teamName || !selectedImage} buttonText="Tilføj hold" />
    </div>
  );
}