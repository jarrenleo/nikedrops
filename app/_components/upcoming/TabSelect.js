"use client";

import { useGlobalState } from "@/app/_providers/ContextProvider";

function Tab({ channelName, channel, setChannel }) {
  return (
    <button
      className={`border-b-2 px-4 py-2 ${
        channelName === channel
          ? "border-primary"
          : "border-transparent text-muted-foreground"
      }`}
      onClick={() => setChannel(channelName)}
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
