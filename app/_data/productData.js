// Same as upcomingData.js
const locales = {
  SG: "en-SG",
  MY: "en-MY",
  JP: "ja-JP",
  KR: "ko-KR",
  FR: "fr-FR",
  GB: "en-GB",
  CA: "en-CA",
  US: "en-US",
};

// Same as upcomingData.js
const currencies = {
  SG: "SGD",
  MY: "MYR",
  JP: "JPY",
  KR: "KRW",
  FR: "EUR",
  GB: "GBP",
  CA: "CAD",
  US: "USD",
};

// Same as upcomingData.js
const languages = {
  SG: "en-GB",
  MY: "en-GB",
  JP: "ja",
  KR: "ko",
  FR: "fr",
  GB: "en-GB",
  CA: "en-GB",
  US: "en",
};

// Same function as upcomingData.js
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch nike data");

    const data = await response.json();
    if (!data.objects.length) throw new Error("No products found");

    return data;
  } catch (error) {
    throw Error(error.message);
  }
}

// Same function as upcomingData.js
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

// Same function as upcomingData.js
function formatDateTime(dateTimeObject, country, timeZone) {
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

// Same as upcomingData.js
function extractPublishedName(country, sku, publishedContent) {
  let publishedName;
  const title = publishedContent.properties.coverCard.title;
  const subtitle = publishedContent.properties.coverCard.subtitle;

  if (title && subtitle) {
    publishedName = `${subtitle} '${title}'`;
  } else {
    const seoTitle = publishedContent.properties.seo.title;
    if (!seoTitle.includes(`(${sku})`)) return;

    let startIndex = 0;
    let indexToDeduct = 2;
    if (country === "KR") indexToDeduct = 1;

    const endIndex = seoTitle.indexOf(sku) - indexToDeduct;

    publishedName = seoTitle.slice(startIndex, endIndex);
  }

  return publishedName;
}

// Same as upcomingData.js
function formatImageUrl(sku) {
  return `https://secure-images.nike.com/is/image/DotCom/${sku.replace(
    "-",
    "_",
  )}`;
}

function getProductInfo(productsInfo, sku) {
  return productsInfo.length === 1
    ? productsInfo[0]
    : productsInfo.find((product) => product.merchProduct.styleColor === sku);
}

function getDiscountRate(merchPrice) {
  if (!merchPrice.discounted) return 0;

  return (
    ((merchPrice.fullPrice - merchPrice.currentPrice) / merchPrice.fullPrice) *
    100
  ).toFixed(0);
}

function getMethod(product) {
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

function getSizesAndStockLevels(skus, gtins) {
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

function getProductUrl(channel, country, slug) {
  let countryPath = "",
    launchPath = "";

  if (country !== "US") countryPath = `/${country.toLowerCase()}`;
  if (channel === "SNKRS Web") launchPath = "/launch";

  return `https://www.nike.com${countryPath}${launchPath}/t/${slug}`;
}

export async function getProductData(channel, sku, country, timeZone) {
  try {
    const language = languages[country];
    if (!language) throw new Error("Unsupported country.");

    const { objects } = await fetchData(
      `https://api.nike.com/product_feed/threads/v3/?filter=marketplace(${country})&filter=language(${language})&filter=channelName(${channel})&filter=productInfo.merchProduct.styleColor(${sku})&filter=exclusiveAccess(true,false)`,
    );

    const productInfo = getProductInfo(objects[0].productInfo, sku);

    let name = productInfo.productContent.fullTitle;
    if (channel === "SNKRS Web")
      name =
        extractPublishedName(country, sku, data.publishedContent) ||
        productInfo.productContent.fullTitle;

    const colour = productInfo.productContent.colorDescription || "-";
    const dateTimeObject = new Date(
      productInfo.launchView?.startEntryDate ||
        productInfo.merchProduct.commerceStartDate,
    );
    const [releaseDate, releaseTime] = formatDateTime(
      dateTimeObject,
      country,
      timeZone,
    );
    const retailPrice = formatPrice(
      +productInfo.merchPrice.fullPrice,
      country,
      productInfo.merchPrice.currency,
    );
    const currentPrice = formatPrice(
      +productInfo.merchPrice.currentPrice,
      country,
      productInfo.merchPrice.currency,
    );
    const discountRate = getDiscountRate(productInfo.merchPrice);
    const method = getMethod(productInfo);
    const quantity = productInfo.merchProduct.quantityLimit;
    const sizesAndStockLevels = getSizesAndStockLevels(
      productInfo.skus,
      productInfo.availableGtins,
    );
    // Might need to fix this
    const productUrl = getProductUrl(
      channel,
      country,
      objects[0].publishedContent.properties.seo.slug,
    );
    const imageUrl = formatImageUrl(sku);

    return {
      name,
      colour,
      releaseDate,
      releaseTime,
      sku,
      retailPrice,
      currentPrice,
      discountRate,
      method,
      quantity,
      sizesAndStockLevels,
      productUrl,
      imageUrl,
    };
  } catch (error) {
    throw Error(error.message);
  }
}
