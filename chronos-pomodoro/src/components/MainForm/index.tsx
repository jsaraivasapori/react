import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import styles from "./styles.module.css";
import { useRef, useState } from "react";

export function MainForm() {
  // const [taskName, setTaskName] = useState("");

  const taskNameInput = useRef<HTMLInputElement>(null);
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action="">
      <div className={styles.formRow}>
        <DefaultInput
          labelText="oi"
          id="meuInput"
          type="text"
          placeholder="Meu input"
          // value={taskName} //input controlado pelo estado taskName que é monitorado pelo useState
          // onChange={(e) => setTaskName(e.target.value)}
          ref={taskNameInput}
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
