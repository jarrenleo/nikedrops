import { NextResponse } from "next/server";
import clientPromise from "@/app/_lib/mongodb";
import { formatDateTime } from "@/app/_lib/utils";

const channelMap = {
  "SNKRS Web": "snkrs",
  "Nike.com": "nike",
};

function groupUpcomingDataByDate(upcomingData, country, timeZone) {
  let ungroupedData = upcomingData;

  for (let i = 0; i < ungroupedData.length; ++i) {
    const dateTimeObject = new Date(ungroupedData[i].releaseDateTime);
    const [releaseDate, releaseTime] = formatDateTime(
      dateTimeObject,
      country,
      timeZone,
    );
    ungroupedData[i].releaseDate = releaseDate;
    ungroupedData[i].releaseTime = releaseTime;
  }

  const groupedData = ungroupedData.reduce((acc, product) => {
    if (!acc[product.releaseDate]) acc[product.releaseDate] = [];
    acc[product.releaseDate].push(product);

    return acc;
  }, {});

  return groupedData;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const channel = searchParams.get("channel");
    const country = searchParams.get("country");
    const timeZone = searchParams.get("timeZone");

    const client = await clientPromise;
    const db = client.db("sneakify");
    const upcomingData = await db
      .collection(`${channelMap[channel]}-${country.toLowerCase()}`)
      .find({})
      .toArray();

    return NextResponse.json(
      groupUpcomingDataByDate(upcomingData, country, timeZone),
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
