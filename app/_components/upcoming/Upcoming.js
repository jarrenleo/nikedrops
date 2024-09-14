import TabSelect from "./TabSelect";
import UpcomingList from "./UpcomingList";
import CountrySelect from "./CountrySelect";

export default function Upcoming() {
  return (
    <div className="flex flex-col">
      <h2 className="mb-2 px-4 text-xl font-bold">Upcoming Releases</h2>

      <div className="px-4">
        <div className="flex items-center justify-between border-b border-secondary">
          <TabSelect />
          <CountrySelect />
        </div>
      </div>
      <UpcomingList />
    </div>
  );
}
