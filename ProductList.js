import React, { useState } from "react";
import productsData from "./productsData"; // Make sure this file exists and exports the array

export default function ProductList({ onAddToCart }) {
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {productsData.map((product) => {
        const discountedPrice = product.discount
          ? (product.price * (100 - product.discount)) / 100
          : product.price;

        const selectedSize = selectedSizes[product.id] || "M";

        return (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              background: "#fff",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Discount badge */}
            {product.discount > 0 && (
              <div
                style={{
                  position: "absolute",
                  background: "#ff3f6c",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  top: "10px",
                  left: "10px",
                  fontSize: "12px",
                }}
              >
                {product.discount}% OFF
              </div>
            )}

            {/* Product image */}
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />

            {/* Product details */}
            <h3>{product.name}</h3>
            <p>{product.brand}</p>

            {product.discount > 0 ? (
              <p>
                <span style={{ textDecoration: "line-through", color: "#888" }}>
                  ₹{product.price}
                </span>{" "}
                <span style={{ fontWeight: "bold" }}>₹{discountedPrice}</span>
              </p>
            ) : (
              <p style={{ fontWeight: "bold" }}>₹{product.price}</p>
            )}

            <p style={{ fontSize: "14px", color: "#555" }}>
              {product.description}
            </p>

            {/* 👇 SIZE DROPDOWN — this will now be visible */}
            <div style={{ marginBottom: "10px" }}>
              <label style={{ fontSize: "14px", marginRight: "5px" }}>
                Size:
              </label>
              <select
                value={selectedSize}
                onChange={(e) => handleSizeChange(product.id, e.target.value)}
                style={{
                  padding: "5px 8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            {/* Add to cart button */}
            <button
              onClick={() =>
                onAddToCart({ ...product, size: selectedSize }) // ✅ includes size
              }
              style={{
                padding: "8px 15px",
                backgroundColor: "#ff3f6c",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}
