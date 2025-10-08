import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import styles from "./styles.module.css";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {
  const { state, setState } = useTaskContext();

  const taskNameInput = useRef<HTMLInputElement>(null);

  //ciclos

  const nextCycle = getNextCycle(state.currentCycle); // pega o proximo ciclo baseado no estado atual antes de submeter o formualrio.
  const nextTypeCycle = getNextCycleType(nextCycle);
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) {
      console.warn("Input ref is null");
      return;
    }

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert("Digite o nome da tarefa");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      stardDate: Date.now(),
      completeDate: null,
      interruptedDate: null,
      durationInMinutes: state.config[nextTypeCycle],
      type: nextTypeCycle,
    };

    const secondsRemaining = newTask.durationInMinutes * 60;

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle, //sera o estado anterior pq so muda na proxima setState
        secondsRemaining, // Conferir
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
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
      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <DefaultButton
            icon={
              <>
                <PlayCircleIcon />
              </>
            }
          />
        </div>
      )}
    </form>
  );
}
