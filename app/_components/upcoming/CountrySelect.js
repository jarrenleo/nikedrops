"use client";

import Image from "next/image";
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
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem value={country} key={country}>
            <div className="flex items-center gap-2">
              <Image
                src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                alt={country}
                width={20}
                height={15}
                className="border border-border"
              />
              <span>{country}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
