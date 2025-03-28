import Product from "@/app/_components/product/Product";

export async function generateMetadata({ params }) {
  const { sku } = await params;

  return {
    title: `Nike Drops | ${sku}`,
  };
}

export default function Page() {
  return <Product />;
}
