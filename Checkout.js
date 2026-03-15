import React, { useState } from "react";

export default function Checkout({ cartItems, onSubmitOrder }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !pin || !phone) {
      return alert("Please fill all shipping details");
    }

    // Prepare shipping object including sizes already in cartItems
    const shippingDetails = {
      name,
      address,
      pin,
      phone,
      total,
      items: cartItems.map((item) => ({
        ...item,
        size: item.size || "M", // size comes from Home
      })),
    };

    onSubmitOrder(shippingDetails);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* Order Summary */}
          <div style={{ marginBottom: "30px" }}>
            <h3>Order Summary</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    background: "#fff",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                  />
                  <h3>{item.name}</h3>
                  <p>{item.brand}</p>
                  <p>Quantity: {item.quantity}</p>
                 
                  <p>Price: ₹{item.price}</p>
                </div>
              ))}
            </div>
            <h4 style={{ marginTop: "20px" }}>Total: ₹{total}</h4>
          </div>

          {/* Shipping Details */}
          <div style={{ marginBottom: "30px" }}>
            <h3>Shipping Details</h3>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                maxWidth: "400px",
              }}
            >
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
              <textarea
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ ...inputStyle, height: "80px" }}
              />
              <input
                type="text"
                placeholder="Pin Code"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyle}
              />
              <button type="submit" style={buttonStyle}>
                Place Order
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
};

const buttonStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#ff3f6c",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};
