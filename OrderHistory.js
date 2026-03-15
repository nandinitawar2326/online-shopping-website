export default function OrderHistory({ ordersHistory }) {
  if (!ordersHistory || ordersHistory.length === 0)
    return <p>You have no orders yet.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>
      {ordersHistory.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "20px",
            background: "#fff",
          }}
        >
          <h3>Order ID: {order.id}</h3>
          <p>Placed on: {new Date(order.created_at).toLocaleString()}</p>
          <h4>Shipping Details:</h4>
          <p>Name: {order.data.name}</p>
          <p>Address: {order.data.address}</p>
          <p>Pin: {order.data.pin}</p>
          <p>Phone: {order.data.phone}</p>

          <h4>Items:</h4>
          {order.data.items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src={process.env.PUBLIC_URL + item.image}
                alt={item.name}
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
              <div>
                <p>{item.name}</p>
                {/* Added size */}
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            </div>
          ))}
          <h4>Total: ₹{order.total}</h4>
        </div>
      ))}
    </div>
  );
}
