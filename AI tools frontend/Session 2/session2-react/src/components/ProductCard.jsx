/**
 * Q2. Flipkart-Style Product Card
 * -------------------------------------------------
 * A React component displaying a Flipkart product card
 * with image, title, and price.
 * 
 * This component was pasted into ChatGPT to identify
 * potential errors/warnings. See the explanation below
 * the component code.
 */

import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const {
    image,
    title,
    brand,
    price,
    originalPrice,
    discount,
    rating,
    ratingCount,
    freeDelivery,
  } = product;

  return (
    <div className="fk-product-card">
      {/* Product Image */}
      <div className="fk-product-image">
        <img src={image} alt={title} loading="lazy" />
        <button className="fk-wishlist" aria-label="Add to wishlist">
          ♡
        </button>
      </div>

      {/* Product Details */}
      <div className="fk-product-details">
        <p className="fk-brand">{brand}</p>
        <h3 className="fk-title">{title}</h3>

        {/* Rating */}
        <div className="fk-rating-row">
          <span className="fk-rating-badge">
            {rating} ★
          </span>
          <span className="fk-rating-count">({ratingCount})</span>
        </div>

        {/* Pricing */}
        <div className="fk-price-row">
          <span className="fk-current-price">₹{price.toLocaleString()}</span>
          <span className="fk-original-price">₹{originalPrice.toLocaleString()}</span>
          <span className="fk-discount">{discount}% off</span>
        </div>

        {/* Delivery */}
        {freeDelivery && (
          <p className="fk-delivery">Free Delivery</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

/**
 * ============================================================
 * ChatGPT Error Analysis (Q2 Answer)
 * ============================================================
 * 
 * When the above component was pasted into ChatGPT along with 
 * the VS Code terminal errors, the following were identified:
 * 
 * ERROR 1: Missing PropTypes validation
 * ──────────────────────────────────────
 * Warning: "prop type 'product' is missing in props validation"
 * Fix: Add PropTypes or switch to TypeScript.
 * 
 * import PropTypes from 'prop-types';
 * ProductCard.propTypes = {
 *   product: PropTypes.shape({
 *     image: PropTypes.string.isRequired,
 *     title: PropTypes.string.isRequired,
 *     brand: PropTypes.string.isRequired,
 *     price: PropTypes.number.isRequired,
 *     originalPrice: PropTypes.number.isRequired,
 *     discount: PropTypes.number.isRequired,
 *     rating: PropTypes.number.isRequired,
 *     ratingCount: PropTypes.string.isRequired,
 *     freeDelivery: PropTypes.bool,
 *   }).isRequired,
 * };
 * 
 * ERROR 2: "price.toLocaleString is not a function"
 * ──────────────────────────────────────────────────
 * This occurs if price is passed as a string instead of a number.
 * Fix: Use Number(price).toLocaleString() or ensure the prop 
 * is always a number type.
 * 
 * ERROR 3: Missing 'key' prop in lists
 * ─────────────────────────────────────
 * If ProductCard is rendered inside a .map(), each instance 
 * must have a unique key prop on the parent element.
 * Fix: <ProductCard key={product.id} product={product} />
 * 
 * ERROR 4: img tag alt attribute
 * ─────────────────────────────────────
 * If title is undefined, the alt attribute becomes meaningless.
 * Fix: alt={title || "Product image"}
 * 
 * ============================================================
 */
