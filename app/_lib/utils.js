import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function mapChannel(channel) {
  if (channel === "SNKRS") return "SNKRS Web";
  if (channel === "NIKE") return "Nike.com";

  throw new Error("Invalid channel.");
}
