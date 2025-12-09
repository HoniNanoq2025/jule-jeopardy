import { useNavigate } from "react-router-dom";
import styles from "./NameGame.module.css";
import Button from "../../components/Button/Button";

export default function NameGame() {

  const navigate = useNavigate()

  const navigateNewGame = ()=>{
    navigate("/create-category")
  }

  return (

    <div className={styles.gameName}>

      <div className={styles.gameNameContainer}>
      
      

      <div>

<input type="text" placeholder="Giv spillet et navn..."/></div>

<div>

<Button buttonText="Tilføj kategorier" onButtonClick={navigateNewGame}/>

</div>

</div>


    </div>



  

  )

}
