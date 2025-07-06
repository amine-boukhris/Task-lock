export type User = {
  id?: string;
  email?: string;
};

export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

export type Task = {
  id: string;
  user_id: string;
  title: string;
  duration: number;
  time_left: number;
  status: TaskStatus;
  created_at: Date;
};

export type NewTask = Pick<Task, "title" | "duration" | "user_id">;

export type TaskUpdate = Omit<Partial<Task>, "id" | "created_at">;

export type FocusTime = {
  id: string;
  user_id: string;
  time: number;
  date: string;
};

export type NewFocusTime = Omit<FocusTime, "id">;

export type FocusTimeUpdate = Pick<FocusTime, "time">;
