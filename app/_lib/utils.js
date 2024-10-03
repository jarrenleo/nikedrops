import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const locales = {
  SG: "en-SG",
  MY: "en-MY",
  JP: "ja-JP",
  KR: "ko-KR",
  FR: "fr-FR",
  GB: "en-GB",
  CA: "en-CA",
  US: "en-US",
};

export const languages = {
  SG: "en-GB",
  MY: "en-GB",
  JP: "ja",
  KR: "ko",
  FR: "fr",
  GB: "en-GB",
  CA: "en-GB",
  US: "en",
};

export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch product data.");

    const data = await response.json();

    return data;
  } catch (error) {
    throw Error(error.message);
  }
}

export function getProductInfo(productsInfo, sku) {
  return productsInfo.length === 1
    ? productsInfo[0]
    : productsInfo.find((product) => product.merchProduct.styleColor === sku);
}

export function extractPublishedName(country, sku, publishedContent) {
  let publishedName;
  const title = publishedContent.properties.coverCard.title;
  const subtitle = publishedContent.properties.coverCard.subtitle;

  if (title && subtitle) {
    publishedName = `${subtitle} '${title}'`;
  } else {
    const seoTitle = publishedContent.properties.seo.title;
    if (!seoTitle.includes(`(${sku})`)) return;

    let startIndex = 0;
    if (country === "FR") startIndex = 21;

    let indexToDeduct = 2;
    if (country === "KR") indexToDeduct = 1;

    const endIndex = seoTitle.indexOf(sku) - indexToDeduct;

    publishedName = seoTitle.slice(startIndex, endIndex);
  }

  return publishedName;
}

export function formatDateTime(dateTimeObject, country, timeZone) {
  const locale = locales[country];

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone,
  });

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });

  return [
    dateFormatter.format(dateTimeObject),
    timeFormatter.format(dateTimeObject).toUpperCase(),
  ];
}

export async function extractImageUrl(sku) {
  const response = await fetch(
    `https://secure-images.nike.com/is/image/DotCom/${sku.replace("-", "_")}`,
  );
  const imageUrl = response.url.replace(
    "rgb:FFFFFF,q_auto,h_400",
    "rgb:D4D4D4,q_auto,h_960",
  );

  return imageUrl;
}

export function getStatusColour(status) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-600";
    case "HOLD":
      return "bg-yellow-600";
    case "INACTIVE":
      return "bg-red-600";
    default:
      return "bg-border";
  }
}

export function getStockLevelColour(status) {
  switch (status) {
    case "HIGH":
      return "bg-green-600";
    case "MEDIUM":
      return "bg-yellow-600";
    case "LOW":
      return "bg-orange-600";
    case "OOS":
      return "bg-red-600";
    default:
      return "";
  }
}
