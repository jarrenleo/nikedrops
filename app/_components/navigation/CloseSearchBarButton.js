import { ArrowLeft } from "lucide-react";

export default function CloseSearchBarButton({ onClick }) {
  return (
    <button
      className="rounded-md p-2 transition duration-150 animate-in fade-in hover:bg-secondary active:scale-95 motion-reduce:animate-none"
      onClick={onClick}
      aria-label="Back button"
    >
      <ArrowLeft width={20} height={20} />
    </button>
  );
}
