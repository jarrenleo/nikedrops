import { NextResponse } from "next/server";
import { getUpcomingData } from "@/app/_data/upcomingData";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const channel = searchParams.get("channel");
    const country = searchParams.get("country");
    const timeZone = searchParams.get("timeZone");

    const upcomingData = await getUpcomingData(channel, country, timeZone);

    return NextResponse.json(upcomingData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
