import { ArrowLeft } from "lucide-react";

export default function BackButton({ onClick }) {
  return (
    <button
      className="rounded-md p-2 transition-colors hover:bg-secondary"
      onClick={onClick}
    >
      <ArrowLeft />
    </button>
  );
}
