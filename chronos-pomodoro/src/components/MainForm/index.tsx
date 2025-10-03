import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import styles from "./styles.module.css";

export function MainForm() {
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
  }
  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action="">
      <div className={styles.formRow}>
        <DefaultInput
          labelText="oi"
          id="meuInput"
          type="text"
          placeholder="Meu input"
        />
      </div>

      <div className={styles.formRow}>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className={styles.formRow}>
        <Cycles />
      </div>

      <div className={styles.formRow}>
        <DefaultButton
          icon={
            <>
              <PlayCircleIcon />
            </>
          }
        />
      </div>
    </form>
  );
}
