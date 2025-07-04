import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function secondsToMM(time: number) {
  return Math.ceil(time / 60);
}

export function secondsToMMSS(time: number) {
  return `${Math.floor(time! / 60)}:${
    time! % 60 < 10 ? "0" + (time! % 60) : time! % 60
  }`;
}

export function secondsToHHMMSS(time: number) {
  return `${
    Math.floor(time / 3600) < 10
      ? "0" + Math.floor(time / 3600)
      : Math.floor(time / 3600)
  }:${
    Math.floor((time % 3600) / 60) < 10
      ? "0" + Math.floor((time % 3600) / 60)
      : Math.floor((time % 3600) / 60)
  }:${
    (time % 3600) % 60 < 10 ? "0" + ((time % 3600) % 60) : (time % 3600) % 60
  }`;
}

export function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
