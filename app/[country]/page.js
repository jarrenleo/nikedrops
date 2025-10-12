import Upcoming from "@/app/_components/upcoming/Upcoming";

export async function generateMetadata({ params }) {
  const { country } = await params;

  return {
    title: `Nike Drops ${country.toUpperCase()}`,
  };
}

export default function Page() {
  return <Upcoming />;
}
