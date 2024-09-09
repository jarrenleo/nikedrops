"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/others/Select";

const countries = ["SG", "MY", "JP", "KR", "FR", "GB", "CA", "US"];

export default function CountrySelect() {
  const router = useRouter();
  const params = useParams();
  const [channel, country] = params.slug.split("_");
  const [selectedCountry, setSelectedCountry] = useState(country);

  function handleCountryChange(selectedCountry) {
    setSelectedCountry(selectedCountry);
    router.push(`/${channel}_${selectedCountry}`);
  }

  return (
    <Select value={selectedCountry} onValueChange={handleCountryChange}>
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
              />
              <span>{country}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
