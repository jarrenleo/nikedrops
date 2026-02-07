import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const locales = {
  JP: "ja-JP",
  KR: "ko-KR",
  SG: "en-SG",
  MY: "en-MY",
  FR: "fr-FR",
  GB: "en-GB",
  CA: "en-CA",
  AU: "en-AU",
  US: "en-US",
  MX: "es-MX",
};

export const languages = {
  JP: "ja",
  KR: "ko",
  SG: "en-GB",
  MY: "en-GB",
  FR: "fr",
  GB: "en-GB",
  CA: "en-GB",
  AU: "en-GB",
  US: "en",
  MX: "es-419",
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
  const title = publishedContent.properties.coverCard?.title;
  const subtitle = publishedContent.properties.coverCard?.subtitle;

  if (title && subtitle) {
    publishedName = `${subtitle} '${title}'`;
  } else {
    const seoTitle = publishedContent.properties.seo?.title;
    if (!seoTitle || !seoTitle.includes(`(${sku})`)) return;

    let startIndex = 0;
    if (country === "FR") startIndex = 21;
    if (country === "MX") startIndex = 28;

    let indexToDeduct = 2;
    if (country === "KR" || country === "MX") indexToDeduct = 1;

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

export async function extractImageUrl(nodes, sku) {
  const imageNode = nodes.find((node) =>
    node.properties.internalName?.includes(sku),
  );

  return (
    nodes[0].nodes?.at(0).properties.squarishURL ||
    imageNode?.properties.squarishURL
  );
}

export function getStatusColour(status) {
  switch (status) {
    case "ACTIVE":
      return "bg-green";
    case "HOLD":
      return "bg-yellow";
    case "INACTIVE":
      return "bg-red";
    case "CANCEL":
      return "bg-red";
    default:
      return "bg-border";
  }
}

export function getStockLevelColour(status) {
  switch (status) {
    case "HIGH":
      return "bg-green";
    case "MEDIUM":
      return "bg-yellow";
    case "LOW":
      return "bg-red";
    case "OOS":
      return "bg-red";
    default:
      return "";
  }
}
