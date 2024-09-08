"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("country"));

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    router.push(`?${createQueryString("country", value)}`);
  }, [router, createQueryString, value]);

  return (
    <Select onValueChange={setValue} defaultValue={value}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem value={country} key={country}>
            <span>{country}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
