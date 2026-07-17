"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopySkuButton({ sku }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(sku);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <button
      className="rounded-md p-0.5 transition hover:bg-secondary active:scale-95"
      onClick={handleCopy}
      aria-label="Copy SKU to clipboard"
    >
      {isCopied ? (
        <Check
          width={14}
          height={14}
          className="duration-200 ease-out animate-in fade-in zoom-in-50 motion-reduce:animate-none"
        />
      ) : (
        <Copy
          width={14}
          height={14}
          className="duration-200 ease-out animate-in fade-in zoom-in-50 motion-reduce:animate-none"
        />
      )}
    </button>
  );
}
