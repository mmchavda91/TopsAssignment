# 🍽️ React Capstone Project — Section 1 Assignment
### Project: **AI-Powered Smart Recipe & Meal Planner**

---

## Question 1 — Project Summary

The main goal of this React capstone project is to build an **AI-Powered Smart Recipe & Meal Planner** — a full-featured web application that helps users discover recipes, plan their weekly meals, track their nutritional intake, and automatically generate a shopping list based on their chosen meals. Inspired by apps like Zomato (food discovery), Flipkart (smart cart), and Google Fit (health tracking), this app will allow users to log in, get personalized recipe recommendations based on their dietary preferences (vegetarian, vegan, keto, etc.), drag and drop meals into a weekly calendar, and with one click generate an ingredient checklist for grocery shopping. The app aims to solve the everyday problem of *"What should I cook today?"* by combining AI-driven suggestions with an intuitive, visually rich React interface — making healthy eating simple, organized, and enjoyable.

---

## Question 2 — 5 Core Features

| # | Feature | Why It's Important |
|---|---------|-------------------|
| 1 | 🔍 **Smart Recipe Search with Filters** (inspired by Zomato) | Users can filter recipes by cuisine, diet type, cooking time, and ingredients on hand, saving them time and ensuring they always find something they can actually make. |
| 2 | 📅 **Weekly Meal Planner Calendar** (inspired by Google Calendar) | A drag-and-drop weekly planner lets users visually organize breakfast, lunch, and dinner for all 7 days, making meal preparation stress-free and structured. |
| 3 | 🛒 **Auto-Generated Shopping List** (inspired by Flipkart/Blinkit) | Automatically collects all ingredients from the planned meals into a single shopping list, preventing forgotten items and reducing food waste. |
| 4 | ❤️ **Favorites & Personal Recipe Collection** (inspired by Instagram Saves) | Users can bookmark and save their favourite recipes into personal collections, so they can quickly revisit tried-and-tested meals without searching again. |
| 5 | 📊 **Nutrition Tracker Dashboard** (inspired by HealthifyMe) | Displays a daily/weekly breakdown of calories, protein, carbs, and fat from planned meals, helping users stay aligned with their personal health goals. |

---

## Question 3 — User Journey Flow Diagram

> **Prompt used with ChatGPT:**
> *"Suggest a flow diagram for a Smart Recipe & Meal Planner React app — from login to generating a shopping list."*

### Flow Diagram:

```
User Opens App
      │
      ▼
Login / Sign Up (Email or Google OAuth)
      │
      ▼
Home Dashboard — Personalized Recommendations
      │
   ┌──┴──────────────────────┐
   │                         │
   ▼                         ▼
Search Recipes           My Meal Plan
   │                         │
   ▼                         ▼
Filter by                Weekly Calendar
Cuisine / Diet            (Mon–Sun View)
   │                         │
   ▼                         ▼
View Recipe Details      Generate Shopping List
   │                         │
   ▼                         ▼
Save to Favorites     Checkout / Order Ingredients
or Add to Meal Plan          │
                             ▼
                    Track Nutrition Goals
```

### 💡 New Ideas ChatGPT Suggested:
1. **Ingredient Substitution AI** — If a user is missing an ingredient, AI suggests the best substitute automatically.
2. **"Surprise Me" Button** — Randomly picks a complete day's meal plan based on user preferences.
3. **Community Recipe Sharing** — Users can post their own recipes like Instagram posts, which others can like and save.
4. **Voice Search** — "Hey App, show me quick 15-minute Indian dinners" — adding accessibility and ease of use.

---

## Question 4 — Detailed Feature Implementation in React

### 🔍 Feature Chosen: **Smart Recipe Search with Filters**

#### Implementation Plan:

This feature will be built using **two main React components** that share state through a **common parent component**.

---

### Component 1: `SearchBar`

```jsx
// SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);  // Passes query up to parent
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
```

**What it does:**
- Manages `query` state locally using `useState`
- Passes the search term **up** to the parent via `onSearch` prop (lifting state up)

---

### Component 2: `FilterPanel`

```jsx
// FilterPanel.jsx
import React, { useState } from 'react';

const FilterPanel = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    cuisine: '',
    diet: '',
    maxTime: 60,
  });

  const handleChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
    onFilterChange(updated);  // Sends filter object up to parent
  };

  return (
    <div className="filter-panel">
      <select name="cuisine" onChange={handleChange}>
        <option value="">All Cuisines</option>
        <option value="Indian">Indian</option>
        <option value="Italian">Italian</option>
        <option value="Chinese">Chinese</option>
      </select>

      <select name="diet" onChange={handleChange}>
        <option value="">All Diets</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Vegan">Vegan</option>
        <option value="Keto">Keto</option>
      </select>

      <input type="range" name="maxTime" min="5" max="120"
        onChange={handleChange} /> Max {filters.maxTime} mins
    </div>
  );
};

export default FilterPanel;
```

---

### Parent Component: `RecipeSearchPage`

```jsx
// RecipeSearchPage.jsx
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import RecipeCard from './RecipeCard';

const RecipeSearchPage = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    // Fetch from API using both query and filters
    const result = await fetchRecipes(searchQuery, filters);
    setRecipes(result);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilterChange={setFilters} />
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
```

---

### 📊 Shared Data Between Components

| Data | Shared Between | How |
|------|---------------|-----|
| `query` (search string) | `SearchBar` → `RecipeSearchPage` | via `onSearch` prop (lifting state up) |
| `filters` (cuisine, diet, time) | `FilterPanel` → `RecipeSearchPage` | via `onFilterChange` prop |
| `recipes` (API results) | `RecipeSearchPage` → `RecipeCard` | passed as `recipe` prop to each card |

---

### Key React Concepts Used:
- ✅ `useState` — local state in each component
- ✅ **Lifting State Up** — child components pass data to parent via props/callbacks
- ✅ **Props** — parent passes data down to `RecipeCard`
- ✅ **Conditional Rendering** — show/hide filters, loading state
- ✅ **API Fetch** — fetches recipe data from a public API (e.g., Spoonacular API)

---

*Assignment submitted for TOPS Technology — React Capstone Project, Section 1*
