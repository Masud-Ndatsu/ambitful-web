import { useQuery } from "@tanstack/react-query";

export interface Country {
  name: string;
  code: string;
}

export interface City {
  id: number;
  name: string;
  country: string;
  region: string;
  population: number;
}

// Fetch countries from REST Countries API
async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca2"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const data = await response.json();

  // Sort alphabetically and format
  return data
    .map((country: { name: { common: string }; cca2: string }) => ({
      name: country.name.common,
      code: country.cca2,
    }))
    .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
}

// Fetch major cities from GeoDB Cities API (free tier)
async function fetchCities(
  countryCode?: string,
  searchQuery?: string
): Promise<City[]> {
  const params = new URLSearchParams({
    limit: "50",
    sort: "-population",
    types: "CITY",
    minPopulation: "100000", // Only major cities
  });

  if (countryCode) {
    params.append("countryIds", countryCode);
  }

  if (searchQuery && searchQuery.length >= 2) {
    params.append("namePrefix", searchQuery);
  }

  const response = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?${params.toString()}`,
    {
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    }
  );

  if (!response.ok) {
    // Fallback to static list if API fails or no API key
    return getStaticCities();
  }

  const data = await response.json();

  return (
    data.data?.map(
      (city: {
        id: number;
        name: string;
        country: string;
        region: string;
        population: number;
      }) => ({
        id: city.id,
        name: city.name,
        country: city.country,
        region: city.region,
        population: city.population,
      })
    ) || []
  );
}

// Static fallback for cities (major global cities)
function getStaticCities(): City[] {
  return [
    {
      id: 1,
      name: "New York",
      country: "United States",
      region: "NY",
      population: 8336817,
    },
    {
      id: 2,
      name: "Los Angeles",
      country: "United States",
      region: "CA",
      population: 3979576,
    },
    {
      id: 3,
      name: "Chicago",
      country: "United States",
      region: "IL",
      population: 2693976,
    },
    {
      id: 4,
      name: "San Francisco",
      country: "United States",
      region: "CA",
      population: 883305,
    },
    {
      id: 5,
      name: "Seattle",
      country: "United States",
      region: "WA",
      population: 753675,
    },
    {
      id: 6,
      name: "Boston",
      country: "United States",
      region: "MA",
      population: 692600,
    },
    {
      id: 7,
      name: "Austin",
      country: "United States",
      region: "TX",
      population: 978908,
    },
    {
      id: 8,
      name: "Denver",
      country: "United States",
      region: "CO",
      population: 727211,
    },
    {
      id: 9,
      name: "Miami",
      country: "United States",
      region: "FL",
      population: 467963,
    },
    {
      id: 10,
      name: "Atlanta",
      country: "United States",
      region: "GA",
      population: 498715,
    },
    {
      id: 11,
      name: "London",
      country: "United Kingdom",
      region: "England",
      population: 8982000,
    },
    {
      id: 12,
      name: "Toronto",
      country: "Canada",
      region: "Ontario",
      population: 2731571,
    },
    {
      id: 13,
      name: "Vancouver",
      country: "Canada",
      region: "BC",
      population: 631486,
    },
    {
      id: 14,
      name: "Berlin",
      country: "Germany",
      region: "Berlin",
      population: 3644826,
    },
    {
      id: 15,
      name: "Paris",
      country: "France",
      region: "Île-de-France",
      population: 2161000,
    },
    {
      id: 16,
      name: "Sydney",
      country: "Australia",
      region: "NSW",
      population: 5312163,
    },
    {
      id: 17,
      name: "Singapore",
      country: "Singapore",
      region: "Singapore",
      population: 5850342,
    },
    {
      id: 18,
      name: "Tokyo",
      country: "Japan",
      region: "Tokyo",
      population: 13960000,
    },
    {
      id: 19,
      name: "Amsterdam",
      country: "Netherlands",
      region: "North Holland",
      population: 872680,
    },
    {
      id: 20,
      name: "Dublin",
      country: "Ireland",
      region: "Leinster",
      population: 544107,
    },
    {
      id: 21,
      name: "Bangalore",
      country: "India",
      region: "Karnataka",
      population: 8443675,
    },
    {
      id: 22,
      name: "Tel Aviv",
      country: "Israel",
      region: "Tel Aviv",
      population: 451523,
    },
    {
      id: 23,
      name: "Stockholm",
      country: "Sweden",
      region: "Stockholm",
      population: 978770,
    },
    {
      id: 24,
      name: "Zurich",
      country: "Switzerland",
      region: "Zurich",
      population: 421878,
    },
    {
      id: 25,
      name: "Remote",
      country: "Worldwide",
      region: "Remote",
      population: 0,
    },
  ];
}

export const geoKeys = {
  all: ["geo"] as const,
  countries: () => [...geoKeys.all, "countries"] as const,
  cities: (countryCode?: string, search?: string) =>
    [...geoKeys.all, "cities", countryCode, search] as const,
};

export function useCountries() {
  return useQuery({
    queryKey: geoKeys.countries(),
    queryFn: fetchCountries,
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // Keep in cache for 7 days
    retry: 2,
  });
}

export function useCities(countryCode?: string, searchQuery?: string) {
  return useQuery({
    queryKey: geoKeys.cities(countryCode, searchQuery),
    queryFn: () => fetchCities(countryCode, searchQuery),
    staleTime: 60 * 60 * 1000, // Cache for 1 hour
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
    enabled: true,
  });
}

// Hook for preferred locations (cities formatted for multi-select)
export function usePreferredLocations(countryCode?: string) {
  const { data: cities, isLoading, error } = useCities(countryCode);

  const options =
    cities?.map((city) => ({
      value: `${city.name}, ${city.region}, ${city.country}`,
      label: `${city.name}, ${city.region}`,
    })) || [];

  return { options, isLoading, error };
}
