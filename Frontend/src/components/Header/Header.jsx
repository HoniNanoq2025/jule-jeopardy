import styles from "./Header.module.css";
import { Link } from 'react-router-dom'

export default function Header() {
return (
<div className={styles.Header}>
  <Link to ="/"> Jule<span className={styles.jeopardy}>Jeopardy</span>
  </Link>
  </div>

)

}
