import { NextResponse } from "next/server";
import { getQueryData } from "@/app/_lib/query_data";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sku = searchParams.get("q");
    const country = searchParams.get("country");

    const SNKRSResult = await getQueryData("SNKRS Web", sku, country);
    if (SNKRSResult)
      return NextResponse.json({ channel: "SNKRS Web", ...SNKRSResult });

    const NikeResult = await getQueryData("Nike.com", sku, country);
    if (NikeResult)
      return NextResponse.json({ channel: "Nike.com", ...NikeResult });

    throw new Error(`Product ${sku} not found.`);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
