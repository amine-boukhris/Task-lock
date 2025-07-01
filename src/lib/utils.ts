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
