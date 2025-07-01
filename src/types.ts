export type User = {
  id?: string;
  email?: string;
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

export type NewTask = Pick<Task, "title" | "duration">;

export type TaskUpdate = Omit<Partial<Task>, "id" | "created_at">;

export type FocusTime = {
  id: string;
  user_id: string;
  time: number;
  date: Date;
};

export type NewFocusTime = Omit<Partial<FocusTime>, "id" | "user_id">;

export type FocusTimeUpdate = Omit<
  Partial<FocusTime>,
  "id" | "user_id" | "date"
>;
