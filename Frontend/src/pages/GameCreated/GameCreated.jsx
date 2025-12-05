import styles from "./GameCreated.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";


export default function GameCreated() {

  const navigate = useNavigate() 

  const navigateAddTeam = ()=>{
    navigate("/add-team") 
  }

  

  const navigateCategory = ()=>{
     navigate("/create-category")
  }

return (

  <div className={styles.nameGame}>

    <div className={styles.gamediv}>

      <p>Du har nu skabt et spil med 6 kategorier</p>

  
  <div>

<Button buttonText="start spil" onButtonClick={ navigateAddTeam} />
</div>

<div>

<Button buttonText="Skab nyt spil" onButtonClick={ navigateCategory} />

</div>

  </div>

  </div>

)

}


