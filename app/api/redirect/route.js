import { NextResponse } from "next/server";
import { mapChannel } from "@/app/_lib/utils";
import { getFirstUpcomingSKU } from "@/app/_data/upcomingData";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const channel = mapChannel(searchParams.get("channel"));
    const country = searchParams.get("country");

    const sku = await getFirstUpcomingSKU(channel, country);

    return NextResponse.json(sku);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
