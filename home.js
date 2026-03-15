import React, { useState, useEffect } from "react";
import productsData from "./productsData";
import axios from "axios";

export default function Home({ user, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({});

  const products = productsData;
  const banners = ["/assets/frontpage1.jpg", "/assets/frontpage2.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);
  const newArrivals = [...products].slice(-6);

  const handleAddToCart = (product) => {
    if (!user) return alert("Please login to add to cart");
    const size = selectedSizes[product.id] || "M"; // default size
    onAddToCart({ ...product, size });
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <div>
      {/* Banner */}
      <div
        style={{
          width: "100%",
          height: "400px",
          position: "relative",
          overflow: "hidden",
          marginBottom: "30px",
        }}
      >
        <img
          src={banners[currentBanner]}
          alt="Banner"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#fff",
              background: "#ff3f6c",
              padding: "10px 30px",
              borderRadius: "8px",
              animation: "marquee 10s linear infinite",
            }}
            className="floating-offer"
          >
            🎉 20% Diwali Offer starts from 16th Oct! Buy Now! 🛍️
          </span>
        </div>
      </div>

      {/* Category buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          margin: "20px 0",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: activeCategory === cat ? "#ff3f6c" : "#eee",
              color: activeCategory === cat ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "0 20px",
        }}
      >
        {filteredProducts.map((p) => {
          const discountedPrice =
            p.discount > 0 ? (p.price * (100 - p.discount)) / 100 : p.price;
          return (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                background: "#fff",
                textAlign: "center",
                position: "relative",
              }}
            >
              {p.discount > 0 && (
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
                  {p.discount}% OFF
                </div>
              )}
              <img
                src={process.env.PUBLIC_URL + p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              <h3>{p.name}</h3>
              <p>{p.brand}</p>
              {p.discount > 0 ? (
                <p>
                  <span style={{ textDecoration: "line-through", color: "#888" }}>
                    ₹{p.price}
                  </span>{" "}
                  <span style={{ fontWeight: "bold" }}>₹{discountedPrice}</span>
                </p>
              ) : (
                <p style={{ fontWeight: "bold" }}>₹{p.price}</p>
              )}
              <p style={{ fontSize: "14px", color: "#555" }}>{p.description}</p>

         

              <button
                onClick={() => handleAddToCart(p)}
                style={{ padding: "8px 15px", backgroundColor: "#ff3f6c", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Add to Cart
              </button>


            </div>
          );
        })}
      </div>

      {/* Footer remains unchanged */}
      <footer
        style={{
          marginTop: "50px",
          background: "#222",
          color: "#fff",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div style={{ flex: "1 1 200px" }}>
            <h3>About</h3>
            <p>
              We provide the latest fashion products at best prices. Shop the
              trendiest clothing, shoes, and accessories online.
            </p>
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <h3>Quick Links</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><a href="#" style={{ color: "#fff" }}>Home</a></li>
              <li><a href="#" style={{ color: "#fff" }}>Cart</a></li>
              <li><a href="#" style={{ color: "#fff" }}>Orders</a></li>
              <li><a href="#" style={{ color: "#fff" }}>Login</a></li>
            </ul>
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <h3>Contact</h3>
            <p>Email: support@ladiesshop.com</p>
            <p>Phone: +91 8468850843</p>
            <p>Address: Pune, India</p>
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <h3>Newsletter</h3>
            <p>Subscribe to get updates on new products and offers:</p>
            <input
              type="email"
              placeholder="Enter your email"
              style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
            />
            <button
              style={{
                padding: "8px 15px",
                backgroundColor: "#ff3f6c",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <h4>Follow Us</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              fontSize: "24px",
            }}
          >
            <a href="#" style={{ color: "#fff" }}>Instagram</a>
            <a href="#" style={{ color: "#fff" }}>Facebook</a>
            <a href="#" style={{ color: "#fff" }}>Twitter</a>
            <a href="#" style={{ color: "#fff" }}>YouTube</a>
          </div>
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>© 2025 LadiesShop</div>
      </footer>

      {/* Floating Offer Animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .floating-offer:hover { animation-play-state: paused; }
        `}
      </style>
    </div>
  );
}
