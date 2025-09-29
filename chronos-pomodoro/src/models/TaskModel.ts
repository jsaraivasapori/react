import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  name: string;
  durationInminutes: number;
  stardDate: number;
  completeDate: number | null;
  interruptedDate: number | null;
  type: keyof TaskStateModel["config"];
};
