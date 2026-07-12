import { cn } from "@/app/_lib/utils";

export default function Skeleton({ className }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-secondary", className)} />
  );
}
