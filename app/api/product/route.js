// import { NextResponse } from "next/server";
// import { getProductData } from "@/app/_data/productData";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const channel = searchParams.get("channel");
//     const sku = searchParams.get("sku");
//     const country = searchParams.get("country");
//     const timeZone = searchParams.get("timeZone");

//     const productData = await getProductData(channel, sku, country, timeZone);

//     return NextResponse.json(productData);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
