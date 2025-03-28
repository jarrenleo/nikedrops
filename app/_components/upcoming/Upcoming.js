import TabSelect from "./TabSelect";
import UpcomingList from "./UpcomingList";
import CountrySelect from "./CountrySelect";

export default function Upcoming() {
  return (
    <div className="flex h-full flex-col">
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
