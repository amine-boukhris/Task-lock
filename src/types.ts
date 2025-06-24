export type User = {
  id?: string;
  email?: string;
};

export type NewTask = {
  title: string;
  duration: number;
};

export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

export type Task = {
  id: string;
  title: string;
  duration: number;
  time_left: number;
  status: TaskStatus;
  created_at: Date;
};

export type FocusTotal = {
  id: string;
  focus_time: number;
  last_updated: Date;
};
