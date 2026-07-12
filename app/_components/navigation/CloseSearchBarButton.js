import { ArrowLeft } from "lucide-react";

export default function CloseSearchBarButton({ onClick }) {
  return (
    <button
      className="rounded-md p-2 transition hover:bg-secondary active:scale-95"
      onClick={onClick}
      aria-label="Back button"
    >
      <ArrowLeft width={20} height={20} />
    </button>
  );
}
