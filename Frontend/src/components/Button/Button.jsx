import styles from "./Button.module.css";

export default function Button({ ...props }) {
  return (
    <button
      type={props.typeButton || "button"}
      className={`${styles.button} ${props.btnSize || ""}`}
      onClick={props.onButtonClick}
    >
      {props.buttonText}
    </button>
  );
}
