import express from "express";
import cors from "cors";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
