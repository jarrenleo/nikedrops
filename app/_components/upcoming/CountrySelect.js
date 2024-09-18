"use client";

import { useGlobalState } from "@/app/_providers/ContextProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/others/Select";

const countries = ["SG", "MY", "JP", "KR", "FR", "GB", "CA", "US"];

export default function CountrySelect() {
  const { country, setCountry } = useGlobalState();

  return (
    <Select value={country} onValueChange={(country) => setCountry(country)}>
      <SelectTrigger aria-label="Country Select">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem value={country} key={country}>
            <div className="flex items-center gap-2">
              <img
                src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                alt={`Flag of ${country}`}
                className="h-[13px] w-5 border border-border object-cover"
              />
              <span>{country}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
