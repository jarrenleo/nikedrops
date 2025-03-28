import { ArrowLeft } from "lucide-react";

export default function CloseSearchBarButton({ onClick }) {
  return (
    <button
      className="rounded-md p-2 transition-colors hover:bg-secondary"
      onClick={onClick}
      aria-label="Back button"
    >
      <ArrowLeft />
    </button>
  );
}
