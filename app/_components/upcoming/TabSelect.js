"use client";

import { useRouter, useParams } from "next/navigation";

function Tab({ channel, channelName, handleTabClick }) {
  return (
    <button
      className={`border-b-2 px-4 py-2 ${
        channel === channelName
          ? "border-primary"
          : "border-transparent text-muted-foreground"
      }`}
      onClick={() => handleTabClick(channelName)}
    >
      {channelName}
    </button>
  );
}

export default function TabSelect() {
  const router = useRouter();
  const params = useParams();
  const [channel, country] = params.slug.split("_");

  function handleTabClick(channelName) {
    router.push(`/${channelName}_${country}`);
  }

  return (
    <div className="flex border-b border-secondary font-semibold">
      <Tab
        channel={channel}
        channelName="SNKRS"
        handleTabClick={handleTabClick}
      />
      <Tab
        channel={channel}
        channelName="NIKE"
        handleTabClick={handleTabClick}
      />
    </div>
  );
}
