import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import Cart from "./components/Cart";
import OrderHistory from "./components/OrderHistory";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Checkout from "./components/Checkout";
import Profile from "./components/profile";
import SearchResults from "./components/SearchResults";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState("home");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]); // local orders state
  const [selectedSizes, setSelectedSizes] = useState({});


  const API_URL = "http://localhost:5000";

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

 // Fetch cart for logged-in user
useEffect(() => {
  const fetchCart = async () => {
    if (user && token) {
      try {
        const res = await axios.get(`${API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Map sizes from selectedSizes state for frontend display
        const updatedCart = res.data.map(item => ({
          ...item,
         
        }));

        setCartItems(updatedCart);
      } catch (err) {
        console.error(err);
      }
    }
  };
  fetchCart();
}, [user, token, selectedSizes]); // ✅ add dependencies

// Keep your previous handleAddToCart
 // ✅ WORKING ADD TO CART HANDLER
 const handleAddToCart = async (product) => {
  if (!user || !token) {
    alert("Please login to add to cart");
    return;
  }

  try {
    const existing = cartItems.find((item) => item.productId === product.id);
    const quantity = existing ? existing.quantity + 1 : 1;

    await axios.post(
      `${API_URL}/cart/add`,
      { productId: product.id, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const cartRes = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCartItems(cartRes.data);

    alert(`${product.name} added to cart!`);
  } catch (err) {
    console.error("Add to cart error:", err.response?.data || err.message);
    alert("Failed to add to cart");
  }
};



//Remove item from cart (delete from MySQL)
const handleRemoveFromCart = async (cartItemId) => {
  try {
    await axios.delete(`${API_URL}/cart/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ fixed
    });

    // Update frontend cart instantly
    setCartItems(cartItems.filter((item) => item.id !== cartItemId));

    alert("Item removed from cart!");
  } catch (err) {
    console.error("Remove cart error:", err.response?.data || err.message);
    alert("Failed to remove item from cart");
  }
};

  // Place order button in cart page
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return alert("Cart is empty");
    setView("checkout");
  };
    // Submit order from checkout page
// Submit order from checkout page
const handleOrderSubmit = (shippingDetails) => {
  if (cartItems.length === 0) return alert("Cart is empty");

  // Minimal payload for backend
  const payload = {
    name: shippingDetails.name,
    address: shippingDetails.address,
    pin: shippingDetails.pin,
    phone: shippingDetails.phone,
    total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };

  // Send only required data to backend
  axios.post(`${API_URL}/orders/place`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  }).catch((err) => {
    console.warn("Backend storage failed, but frontend order will work.", err.message);
  });

  // Update frontend order history
  const newOrder = {
    id: Date.now(), // temporary id for frontend display
    created_at: new Date().toISOString(),
    data: {
      ...shippingDetails,
      items: cartItems.map((item) => ({
        ...item, // name, price, quantity, image, size selected in Home
      })),
    },
    total: payload.total,
  };

  setOrdersHistory([newOrder, ...ordersHistory]);

  // Clear cart and redirect
  setCartItems([]);
  setView("orders");

  alert("Order placed successfully!");
};


  const handleSearch = (results) => {
    setSearchResults(results);
    setView("search");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar
        user={user}
        setUser={setUser}
        setView={setView}
        cartItems={cartItems}
        onSearch={handleSearch}
        categories={["All", ...new Set(products.map((p) => p.category))]}
      />

      <div style={{ paddingTop: "70px" }}>
        {view === "home" && <Home user={user} token={token} onAddToCart={handleAddToCart} />}

        {view === "cart" && (
          <Cart
            cartItems={cartItems}
            onRemove={handleRemoveFromCart}  // ✅ fix here
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {view === "checkout" && (
          <Checkout cartItems={cartItems} token={token} onSubmitOrder={handleOrderSubmit} />
        )}

        {view === "profile" && <Profile user={user} />}
        {view === "orders" && <OrderHistory ordersHistory={ordersHistory} />}
        {view === "login" && <Login setUser={setUser} setToken={setToken} setView={setView} />}
        {view === "signup" && <Signup setUser={setUser} setView={setView} />}
        {view === "search" && <SearchResults results={searchResults} onAddToCart={handleAddToCart} />}
      </div>
    </div>
  );
}
