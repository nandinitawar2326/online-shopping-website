import express from "express";
import db from "../config/db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Place order (store only in orders table)
router.post("/place", auth, (req, res) => {
  const userId = req.user.id;
  const { address } = req.body; // expect JSON {address: "..."}

  if (!address) return res.status(400).json({ message: "Address required" });

  // Get cart total
  db.query(
    `SELECT c.productId, c.quantity, p.price
     FROM cart c
     JOIN products p ON c.productId = p.id
     WHERE c.userId = ?`,
    [userId],
    (err, cartItems) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      if (cartItems.length === 0) return res.status(400).json({ message: "Cart is empty" });

      const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

      // Insert into orders table
      db.query(
        "INSERT INTO orders (userId, total, address, created_at) VALUES (?, ?, ?, NOW())",
        [userId, total, address],
        (err2, orderResult) => {
          if (err2) return res.status(500).json({ message: "Failed to place order", error: err2 });

          // Clear cart
          db.query("DELETE FROM cart WHERE userId = ?", [userId], (err3) => {
            if (err3) console.error("Failed to clear cart", err3);
            res.json({ message: "Order placed successfully", orderId: orderResult.insertId });
          });
        }
      );
    }
  );
});

// Get order history
router.get("/", auth, (req, res) => {
  const userId = req.user.id;
  db.query(
    `SELECT * FROM orders WHERE userId = ? ORDER BY created_at DESC`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Failed to fetch orders", error: err });
      res.json(results);
    }
  );
});

export default router;
