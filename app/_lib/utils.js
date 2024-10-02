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

export function extractImageUrl(channel, publishedContent) {
  if (channel === "SNKRS Web")
    return publishedContent.coverCard.properties.squarishURL;

  return publishedContent.productCard.properties.squarishURL;
}

export function getStatusColour(status) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-600";
    case "HOLD":
      return "bg-amber-500";
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
      return "bg-amber-500";
    case "LOW":
      return "bg-red-600";
    case "OOS":
      return "bg-red-600";
    default:
      return "bg-transparent";
  }
}
