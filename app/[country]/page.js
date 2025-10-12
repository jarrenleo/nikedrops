import { redirect } from "next/navigation";
import Upcoming from "@/app/_components/upcoming/Upcoming";

const countries = ["AU", "JP", "KR", "SG", "MY", "FR", "GB", "CA", "US", "MX"];

export async function generateMetadata({ params }) {
  const { country } = await params;

  return {
    title: `Nike Drops ${country.toUpperCase()}`,
  };
}

export default async function Page({ params }) {
  const { country } = await params;

  if (!countries.includes(country.toUpperCase())) return redirect("/SG");

  return <Upcoming />;
}
