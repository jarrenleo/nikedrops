import { Suspense } from "react";
import Navigation from "./_components/navigation/Navigation";
import Spinner from "./_components/others/Spinner";
import Upcoming from "./_components/Upcoming/Upcoming";

export default function Page() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <Upcoming />
      </Suspense>
    </>
  );
}
