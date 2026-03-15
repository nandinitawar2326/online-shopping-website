import React from "react";

export default function SearchResults({ results, onAddToCart, user }) {
  if (!results.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
        No products found.
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      padding: "0 20px",
      marginTop: "20px"
    }}>
      {results.map(p => {
        const discountedPrice = p.discount > 0 ? (p.price * (100 - p.discount)) / 100 : p.price;
        return (
          <div key={p.id} style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            background: "#fff",
            textAlign: "center",
            position: "relative",
            transition: "0.3s",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            {p.discount > 0 && (
              <div style={{
                position: "absolute",
                background: "#ff3f6c",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px",
                top: "10px",
                left: "10px",
                fontSize: "12px"
              }}>
                {p.discount}% OFF
              </div>
            )}
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: "220px", objectFit: "contain", marginBottom: "10px" }}
            />
            <h3>{p.name}</h3>
            <p>{p.brand}</p>
            {p.discount > 0 ? (
              <p>
                <span style={{ textDecoration: "line-through", color: "#888" }}>₹{p.price}</span> {" "}
                <span style={{ fontWeight: "bold" }}>₹{discountedPrice}</span>
              </p>
            ) : (
              <p style={{ fontWeight: "bold" }}>₹{p.price}</p>
            )}
            <p style={{ fontSize: "14px", color: "#555" }}>{p.description}</p>
            <button
              onClick={() => onAddToCart(p)}
              style={{
                padding: "8px 15px",
                backgroundColor: "#ff3f6c",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
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
