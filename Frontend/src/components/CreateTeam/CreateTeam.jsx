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
 
  const handleSubmit = async () => {
  if (!teamName || !selectedImage) return;

  const newTeam = {
    name: teamName,
    image: selectedImage,
  };

  try {
    const res = await fetch("https://jeopardy-gkiyb.ondigitalocean.app/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeam),
    });

    if (!res.ok) throw new Error("Failed to create team");

    const savedTeam = await res.json();
    console.log("Team created:", savedTeam);

    // Pass the saved team (with id) to parent
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