"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function getTimeLeft(releaseTimestamp) {
  const remaining = Math.floor((releaseTimestamp - Date.now()) / 1000);
  if (remaining <= 0) return null;

  return {
    Days: Math.floor(remaining / 86400),
    Hours: Math.floor((remaining % 86400) / 3600),
    Minutes: Math.floor((remaining % 3600) / 60),
    Seconds: remaining % 60,
  };
}

function CountdownUnit({ label, value }) {
  const displayValue = String(value).padStart(2, "0");

  return (
    <div className="flex cursor-default flex-col items-center rounded-md bg-secondary px-3 py-2">
      <div className="relative h-7 overflow-hidden text-lg font-semibold tabular-nums">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={displayValue}
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default function CountdownTimer({ releaseTimestamp }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(releaseTimestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(releaseTimestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [releaseTimestamp]);

  if (!timeLeft) return null;

  return (
    <div className="mb-4">
      <span className="text-muted-foreground">Drops In</span>
      <div className="mt-1 grid grid-cols-4 gap-2">
        {Object.entries(timeLeft).map(([label, value]) => (
          <CountdownUnit key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}
