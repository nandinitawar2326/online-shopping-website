import React, { useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaSignInAlt,
  FaBoxOpen,
  FaHome,
  FaUserCircle,
} from "react-icons/fa";
import productsData from "./productsData";

export default function Navbar({ user, setUser, setView, cartItems, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const results = productsData.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(results);
  };

  return (
    <nav style={navStyle}>
      {/* Left: Home + Brand */}
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "8px" }}
        onClick={() => setView("home")}
      >
        <FaHome size={20} />
        <span style={{ fontWeight: "bold", fontSize: "24px" }}>LadiesShop</span>
      </div>

      {/* Center: Search Bar */}
      <form onSubmit={handleSearch} style={{ flexGrow: 1, margin: "0 30px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchStyle}
        />
      </form>

      {/* Right: Buttons */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center", position: "relative" }}>
        <button onClick={() => setView("cart")} style={navBtnStyle}>
          <FaShoppingCart /> Cart ({cartItems.length})
        </button>

        <button onClick={() => setView("orders")} style={navBtnStyle}>
          <FaBoxOpen /> Orders
        </button>

        {!user ? (
          <>
            <button onClick={() => setView("login")} style={navBtnStyle}>
              <FaSignInAlt /> Login
            </button>
            <button onClick={() => setView("signup")} style={navBtnStyle}>
              <FaUser /> Signup
            </button>
          </>
        ) : (
          <div style={{ position: "relative" }}>
            {/* Profile Icon */}
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={navBtnStyle}
            >
              <FaUserCircle size={22} /> Profile
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div style={dropdownStyle}>
                <p
                  style={dropdownItem}
                  onClick={() => {
                    setView("profile"); // navigate to profile page
                    setShowProfileMenu(false);
                  }}
                >
                  My Profile
                </p>
                <p
                  style={dropdownItem}
                  onClick={() => {
                    localStorage.removeItem("token"); // clear token
                    setUser(null);                     // clear user state
                    setShowProfileMenu(false);         // close dropdown
                    setView("home");                   // redirect to home
                  }}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

/* --- Styles --- */
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  backgroundColor: "#ff3f6c",
  color: "#fff",
  position: "fixed",
  width: "100%",
  top: 0,
  zIndex: 1000,
};

const navBtnStyle = {
  background: "transparent",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "16px",
};

const searchStyle = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: "5px",
  border: "none",
};

const dropdownStyle = {
  position: "absolute",
  right: 0,
  top: "40px",
  background: "#fff",
  color: "#000",
  borderRadius: "5px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  minWidth: "150px",
  padding: "10px 0",
  zIndex: 2000,
};

const dropdownItem = {
  padding: "10px 15px",
  cursor: "pointer",
};
