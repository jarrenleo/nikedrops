import Product from "@/app/_components/product/Product";

export async function generateMetadata({ params }) {
  const { sku } = await params;

  return {
    title: `Sneakify | ${sku}`,
  };
}

export default function Page() {
  return <Product />;
}
