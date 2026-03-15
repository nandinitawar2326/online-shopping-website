import React from "react";

export default function Cart({ cartItems, onRemove, onPlaceOrder }) {
  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id} // Make sure this matches cart item ID from DB
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <img
                src={item.image.startsWith("http") ? item.image : process.env.PUBLIC_URL + item.image}
                alt={item.name}
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
              <div style={{ marginLeft: "15px", flexGrow: 1 }}>
                <p><strong>{item.name}</strong></p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>

                <button
                  onClick={() => onRemove(item.id)}
                  style={{
                    padding: "5px 10px",
                    background: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "5px",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button
            onClick={onPlaceOrder}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#ff3f6c",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
