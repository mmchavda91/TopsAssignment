"use client";

import { gql, useQuery } from "@apollo/client";
import styles from "./GraphQLSolutions.module.css";

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      id
      name
      cuisine
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      image
    }
  }
`;

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      title
    }
  }
`;

export function RestaurantCard({ restaurant }) {
  return (
    <article className={styles.restaurantCard}>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.cuisine}</p>
    </article>
  );
}

// Answers questions 1 and 4: fetch the restaurants and render each with its own card.
export function RestaurantList() {
  const { loading, error, data } = useQuery(GET_RESTAURANTS);

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p role="alert">Could not load restaurants: {error.message}</p>;

  const restaurants = data?.restaurants ?? [];
  if (restaurants.length === 0) return <p>No restaurants found.</p>;

  return (
    <section className={styles.restaurantList} aria-label="Restaurants">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <article className={styles.productCard}>
      {product.image && (
        <img className={styles.productImage} src={product.image} alt={product.name} />
      )}
      <div className={styles.productDetails}>
        <h2>{product.name}</h2>
        <p className={styles.productPrice}>₹{product.price}</p>
      </div>
    </article>
  );
}

// Answers questions 2 and 3: show products in cards, with loading and error states.
export function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">Could not load products: {error.message}</p>;

  const products = data?.products ?? [];
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <section className={styles.productList} aria-label="Products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

// Answers question 5: the query requests the "movies" root field, so data.movies
// is the matching result. Keep a key on each item when rendering the list.
export function MoviesList() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">Could not load movies: {error.message}</p>;
  if (!data) return <p>No data.</p>;

  const movies = data.movies ?? [];
  if (movies.length === 0) return <p>No movies found.</p>;

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.title}>{movie.title}</li>
      ))}
    </ul>
  );
}
