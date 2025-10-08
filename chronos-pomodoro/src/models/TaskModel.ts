import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  name: string;
  durationInMinutes: number;
  stardDate: number;
  completeDate: number | null;
  interruptedDate: number | null;
  type: keyof TaskStateModel["config"];
};
