import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
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

  const cycleDurationMap = {
    workTime: `${state.config.workTime} `,
    shortBreakTime: `${state.config.shortBreakTime} `,
    longBreakTime: `${state.config.longBreakTime} `,
  };

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

  function handleInterruptTask() {
    setState((prevState) => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: prevState.tasks.map((task) => {
          if (prevState.activeTask && prevState.activeTask.id === task.id) {
            return { ...task, interruptedDate: Date.now() };
          }
          return task;
        }),
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
          disabled={state.activeTask !== null}
        />
      </div>

      <div className={styles.formRow}>
        <p>Próximo intervalo é de {cycleDurationMap[nextTypeCycle]} minutos</p>
      </div>

      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}
      <div className={styles.formRow}>
        {!state.activeTask && (
          <DefaultButton
            icon={
              <>
                <PlayCircleIcon />
              </>
            }
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            color="green"
            type="submit"
            key="botao_submit"
          />
        )}

        {state.activeTask && (
          <DefaultButton
            icon={
              <>
                <StopCircleIcon />
              </>
            }
            aria-label="Interroper ciclo ativo"
            title="Interroper ciclo ativo"
            color="red"
            type="button"
            key="botao_button"
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
