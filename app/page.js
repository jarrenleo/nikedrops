import Navigation from "./_components/navigation/Navigation";
import Upcoming from "./_components/upcoming/Upcoming";
import Product from "./_components/product/Product";

export default function Page() {
  return (
    <main className="p-4">
      <Navigation />
      <Upcoming />
    </main>
  );
}
