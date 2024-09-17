import {
  languages,
  fetchData,
  getProductInfo,
  extractPublishedName,
  extractImageUrl,
} from "./utils";

export async function getQueryData(channel, sku, country) {
  try {
    const language = languages[country];
    const { objects } = await fetchData(
      `https://api.nike.com/product_feed/threads/v3/?filter=marketplace(${country})&filter=language(${language})&filter=channelName(${channel})&filter=productInfo.merchProduct.styleColor(${sku})&filter=exclusiveAccess(true,false)`,
    );

    const productInfo = getProductInfo(objects[0].productInfo, sku);
    if (!productInfo) return null;

    let name = productInfo.productContent.fullTitle;
    if (channel === "SNKRS Web")
      name =
        extractPublishedName(country, sku, objects[0].publishedContent) ||
        productInfo.productContent.fullTitle;

    const imageUrl = extractImageUrl(
      channel,
      objects[0].publishedContent.properties,
    );

    return {
      name,
      sku,
      imageUrl,
    };
  } catch (error) {
    throw Error(error.message);
  }
}
