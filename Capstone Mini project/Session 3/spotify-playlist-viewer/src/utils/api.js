// utils/api.js
// Q4: Reads Zomato API variables from .env.local and prints them

/**
 * getZomatoConfig
 * Reads NEXT_PUBLIC_ZOMATO_API_KEY and NEXT_PUBLIC_ZOMATO_API_URL
 * from environment variables and returns them.
 */
export function getZomatoConfig() {
  const apiKey = process.env.NEXT_PUBLIC_ZOMATO_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_ZOMATO_API_URL;

  // Print to console (as required by Q4)
  console.log("=== Zomato API Config ===");
  console.log("Zomato API Key:", apiKey);
  console.log("Zomato API URL:", apiUrl);
  console.log("========================");

  return { apiKey, apiUrl };
}

/**
 * fetchZomatoRestaurants
 * Example function to fetch restaurants using Zomato API config
 * @param {string} city - City name to search restaurants in
 */
export async function fetchZomatoRestaurants(city) {
  const { apiKey, apiUrl } = getZomatoConfig();

  if (!apiKey || !apiUrl) {
    console.error("Zomato API Key or URL is missing in .env.local!");
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/cities?q=${city}`, {
      headers: {
        "user-key": apiKey,
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Zomato data:", error);
    return null;
  }
}
