import { ArrowLeft } from "lucide-react";

export default function BackButton({ setIsSearchBarExpanded }) {
  return (
    <button
      className="rounded-md p-2 transition-colors hover:bg-secondary"
      onClick={() => setIsSearchBarExpanded(false)}
    >
      <ArrowLeft size="20" />
    </button>
  );
}
