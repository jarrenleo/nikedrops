import Product from "@/app/_components/product/Product";

export async function generateMetadata({ params }) {
  const { country, sku } = await params;

  return {
    title: `Nike Drops ${country.toUpperCase()} | ${sku.toUpperCase()}`,
  };
}

export default function Page() {
  return <Product />;
}
