import { NextResponse } from "next/server";
import { getFirstUpcomingSKU } from "@/app/_data/upcomingData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const channel = searchParams.get("channel");
  const country = searchParams.get("country");

  try {
    const sku = await getFirstUpcomingSKU(channel, country);
    return NextResponse.json(sku);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
