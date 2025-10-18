import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);

  const nextCyleType = getNextCycleType(nextCycle);

  const tipsWhenActiveTask = {
    workTime: (
      <span>
        Foque por <b>{state.config.workTime} min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Descanse por <b>{state.config.shortBreakTime} min</b>
      </span>
    ),
    longBreakTime: (
      <span>
        Descanso longo de <b>{state.config.longBreakTime} min</b>
      </span>
    ),
  };

  const tipsWhenNoActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de <b> {state.config.workTime} min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Foque por <b>{state.config.shortBreakTime} </b>min no proximo ciclo
      </span>
    ),
    longBreakTime: (
      <span>
        Próximo descanso será <b>longo </b>
      </span>
    ),
  };

  return (
    <>
      {!!state.activeTask && tipsWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsWhenNoActiveTask[nextCyleType]}
    </>
  );
}
