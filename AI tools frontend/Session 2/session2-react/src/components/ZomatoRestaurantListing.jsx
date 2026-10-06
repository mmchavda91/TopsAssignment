/**
 * Q3. Zomato Restaurant Listing — Custom Hook for Data Fetching
 * ──────────────────────────────────────────────────────────────
 * 
 * ChatGPT PROMPT used:
 * "Refactor my React component for a Zomato restaurant listing
 *  to use a custom reusable hook called useRestaurants for 
 *  fetching restaurant data. The hook should handle loading, 
 *  error, and data states. The component should display each
 *  restaurant's name, cuisine, rating, delivery time, and 
 *  cost for two."
 * 
 * Below is the refactored result using the custom hook pattern.
 */

import { useState, useEffect } from "react";

// =========================================================
// Custom Hook: useRestaurants
// Reusable hook for fetching restaurant data from any API
// =========================================================
const useRestaurants = (apiUrl) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);

        // If no API URL is provided, use mock data
        if (!apiUrl) {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 800));
          setRestaurants(MOCK_RESTAURANTS);
          return;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [apiUrl]);

  return { restaurants, loading, error };
};

// =========================================================
// Mock Data (simulating Zomato API response)
// =========================================================
const MOCK_RESTAURANTS = [
  {
    id: 1,
    name: "Barbeque Nation",
    cuisine: "North Indian, BBQ, Mughlai",
    rating: 4.3,
    deliveryTime: "35-40 min",
    costForTwo: 1200,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    isVeg: false,
    promoted: true,
  },
  {
    id: 2,
    name: "Domino's Pizza",
    cuisine: "Pizza, Italian, Fast Food",
    rating: 4.1,
    deliveryTime: "25-30 min",
    costForTwo: 600,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    isVeg: false,
    promoted: false,
  },
  {
    id: 3,
    name: "Saravana Bhavan",
    cuisine: "South Indian, Vegetarian",
    rating: 4.5,
    deliveryTime: "20-25 min",
    costForTwo: 450,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
    isVeg: true,
    promoted: false,
  },
  {
    id: 4,
    name: "Biryani Blues",
    cuisine: "Hyderabadi, Biryani, Mughlai",
    rating: 4.4,
    deliveryTime: "30-35 min",
    costForTwo: 500,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    isVeg: false,
    promoted: true,
  },
  {
    id: 5,
    name: "Green Leaf Cafe",
    cuisine: "Continental, Healthy, Salads",
    rating: 4.6,
    deliveryTime: "15-20 min",
    costForTwo: 800,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    isVeg: true,
    promoted: false,
  },
  {
    id: 6,
    name: "China Town",
    cuisine: "Chinese, Thai, Asian",
    rating: 3.9,
    deliveryTime: "40-45 min",
    costForTwo: 700,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    isVeg: false,
    promoted: false,
  },
];

// =========================================================
// RestaurantCard Component
// =========================================================
const RestaurantCard = ({ restaurant }) => {
  const { name, cuisine, rating, deliveryTime, costForTwo, image, isVeg, promoted } = restaurant;

  return (
    <div className="zm-restaurant-card">
      {promoted && <span className="zm-promoted-badge">Promoted</span>}
      <div className="zm-restaurant-img">
        <img src={image} alt={name} loading="lazy" />
        <div className="zm-discount-tag">60% OFF up to ₹120</div>
      </div>
      <div className="zm-restaurant-info">
        <div className="zm-info-header">
          <h3 className="zm-name">{name}</h3>
          <span className={`zm-rating ${rating >= 4 ? "zm-rating-good" : "zm-rating-avg"}`}>
            {rating} ★
          </span>
        </div>
        <div className="zm-meta-row">
          <span className="zm-cuisine">{cuisine}</span>
        </div>
        <div className="zm-bottom-row">
          {isVeg && <span className="zm-veg-badge">🟢 Pure Veg</span>}
          <span className="zm-delivery-time">🕐 {deliveryTime}</span>
          <span className="zm-cost">₹{costForTwo} for two</span>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// Main Component: ZomatoRestaurantListing (uses custom hook)
// =========================================================
const ZomatoRestaurantListing = () => {
  const { restaurants, loading, error } = useRestaurants(null); // pass API URL or null for mock

  if (loading) {
    return (
      <div className="zm-loading">
        <div className="zm-spinner"></div>
        <p>Discovering restaurants near you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="zm-error">
        <p>⚠️ Oops! {error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="zm-container">
      <div className="zm-header">
        <h2>🍽️ Restaurants Near You</h2>
        <p>{restaurants.length} restaurants delivering to your location</p>
      </div>
      <div className="zm-grid">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export { useRestaurants };
export default ZomatoRestaurantListing;
