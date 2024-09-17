import Product from "@/app/_components/product/Product";

export async function generateMetadata({ params }) {
  return {
    title: `Sneakify | ${params.sku}`,
  };
}

export default function Page() {
  return <Product />;
}
