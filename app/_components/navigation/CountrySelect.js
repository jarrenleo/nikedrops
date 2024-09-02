"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/others/Select";

const countries = {
  Canada: "ca",
  France: "fr",
  "Great Britain": "gb",
  Japan: "jp",
  Korea: "kr",
  Malaysia: "my",
  Singapore: "sg",
  "United States": "us",
};

export default function CountrySelect() {
  const [value, setValue] = useState("Singapore");

  return (
    <Select onValueChange={setValue} defaultValue={value}>
      <SelectTrigger>
        <SelectValue hidden />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(countries).map(([country, abbreviation]) => (
          <SelectItem value={country}>
            <div className="flex items-center gap-2">
              <Image
                src={`https://flagcdn.com/${abbreviation}.svg`}
                alt={`Flag of ${country}`}
                height="15"
                width="20"
                className="h-[15px] w-[20px] rounded-sm object-cover"
              />
              <span>{country}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
