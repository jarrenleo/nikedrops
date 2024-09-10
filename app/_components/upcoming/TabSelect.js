"use client";

import { useGlobalState } from "@/app/_providers/ContextProvider";

const channelMap = {
  SNKRS: "SNKRS Web",
  NIKE: "Nike.com",
};

function Tab({ channelName, channel, setChannel }) {
  return (
    <button
      className={`border-b-2 px-4 py-2 ${
        channelMap[channelName] === channel
          ? "border-primary"
          : "border-transparent text-muted-foreground"
      }`}
      onClick={() => setChannel(channelMap[channelName])}
    >
      {channelName}
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
