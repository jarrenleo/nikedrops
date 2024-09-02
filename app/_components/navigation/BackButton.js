import { ArrowLeft } from "lucide-react";

export default function BackButton({ setIsSearchBarExpanded }) {
  return (
    <button
      className="rounded-md bg-secondary p-3 transition-colors hover:bg-primary/20"
      onClick={() => setIsSearchBarExpanded(false)}
    >
      <ArrowLeft size="20" />
    </button>
  );
}
