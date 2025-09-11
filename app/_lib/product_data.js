import {
  locales,
  languages,
  fetchData,
  getProductInfo,
  extractPublishedName,
  formatDateTime,
  extractImageUrl,
} from "./utils";

const currencies = {
  JP: "JPY",
  KR: "KRW",
  SG: "SGD",
  MY: "MYR",
  FR: "EUR",
  GB: "GBP",
  CA: "CAD",
  AU: "AUD",
  US: "USD",
  MX: "MXN",
};

function formatPrice(price, country) {
  if (!price) return "-";

  const locale = locales[country];
  const currency = currencies[country];

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

function extractReleaseMethod(product) {
  const method =
    product.launchView?.method ?? product.merchProduct.publishType ?? "-";

  if (method === "DAN") {
    const duration =
      (Date.parse(product.launchView.stopEntryDate) -
        Date.parse(product.launchView.startEntryDate)) /
      (60 * 1000);

    return `${method} (${duration} minutes)`;
  }

  return method;
}

function extractSizesAndStockLevels(skus, gtins) {
  const sizesAndStockLevels = [];
  if (!skus || !gtins) return sizesAndStockLevels;

  const gtinMap = new Map();

  for (const gtin of gtins) {
    gtinMap.set(gtin.gtin, gtin);
  }

  for (const sku of skus) {
    const sizeAndStockLevel = { size: sku.nikeSize, stockLevel: "OOS" };

    const matchedGtin = gtinMap.get(sku.gtin);
    if (matchedGtin) sizeAndStockLevel.stockLevel = matchedGtin.level;

    sizesAndStockLevels.push(sizeAndStockLevel);
  }

  return sizesAndStockLevels;
}

function formProductUrl(channel, country, slug) {
  let countryPath = "",
    launchPath = "";

  if (country !== "US") countryPath = `/${country.toLowerCase()}`;
  if (channel === "SNKRS Web") launchPath = "/launch";

  return `https://www.nike.com${countryPath}${launchPath}/t/${slug}`;
}

export async function getProductData(channel, sku, country, timeZone) {
  try {
    const language = languages[country];
    let marketplace = country;
    if (country === "AU") marketplace = "ASTLA";

    const { objects } = await fetchData(
      `https://api.nike.com/product_feed/threads/v3/?filter=marketplace(${marketplace})&filter=language(${language})&filter=channelName(${channel})&filter=productInfo.merchProduct.styleColor(${sku})&filter=exclusiveAccess(true,false)`,
    );
    if (!objects.length) throw new Error(`Product ${sku} not found.`);

    const productInfo = getProductInfo(objects[0].productInfo, sku);

    const status = productInfo.merchProduct.status;

    let name = productInfo.productContent.fullTitle;
    if (channel === "SNKRS Web")
      name =
        extractPublishedName(country, sku, objects[0].publishedContent) ||
        productInfo.productContent.fullTitle;

    const dateTimeObject = new Date(
      productInfo.launchView?.startEntryDate ||
        productInfo.merchProduct.commerceStartDate,
    );
    const [date, time] = formatDateTime(dateTimeObject, country, timeZone);
    const price = formatPrice(
      +productInfo.merchPrice.currentPrice,
      country,
      productInfo.merchPrice.currency,
    );
    const method = extractReleaseMethod(productInfo);
    const cartLimit = productInfo.merchProduct.quantityLimit;
    const sizesAndStockLevels = extractSizesAndStockLevels(
      productInfo.skus,
      productInfo.availableGtins,
    );
    const productUrl = formProductUrl(
      channel,
      country,
      objects[0].publishedContent.properties.seo.slug,
    );
    const imageUrl = await extractImageUrl(
      objects[0].publishedContent.nodes,
      sku,
    );

    return {
      status,
      name,
      date,
      time,
      sku,
      price,
      method,
      cartLimit,
      sizesAndStockLevels,
      productUrl,
      imageUrl,
    };
  } catch (error) {
    throw Error(error.message);
  }
}
