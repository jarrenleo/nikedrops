import TabSelect from "./TabSelect";
import UpcomingList from "./UpcomingList";
import CountrySelect from "./CountrySelect";

export default function Upcoming() {
  return (
    <>
      <div className="flex items-center justify-between border-b border-secondary">
        <TabSelect />
        <CountrySelect />
      </div>
      <UpcomingList />
    </>
  );
}
