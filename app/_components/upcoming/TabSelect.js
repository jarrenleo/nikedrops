"use client";

import { useGlobalState } from "@/app/_providers/ContextProvider";
import { motion } from "motion/react";

const channelMap = {
  SNKRS: "SNKRS Web",
  NIKE: "Nike.com",
};

function Tab({ channelName, channel, setChannel }) {
  const isActive = channelMap[channelName] === channel;

  return (
    <button
      className={`relative px-4 py-2 transition-colors ${
        isActive ? "" : "text-muted-foreground"
      }`}
      onClick={() => setChannel(channelMap[channelName])}
    >
      {channelName}
      {isActive && (
        <motion.div
          layoutId="active-tab-underline"
          className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        />
      )}
    </button>
  );
}

export default function TabSelect() {
  const { channel, setChannel } = useGlobalState();

  return (
    <div className="flex border-b border-secondary font-semibold">
      <Tab channelName="SNKRS" channel={channel} setChannel={setChannel} />
      <Tab channelName="NIKE" channel={channel} setChannel={setChannel} />
    </div>
  );
}
