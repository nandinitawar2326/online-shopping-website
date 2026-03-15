import express from "express";
import db from "../config/db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// -----------------------------
// Add to Cart
// -----------------------------
router.post("/add", auth, (req, res) => {
  console.log("🟢 /cart/add HIT");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("User:", req.user);

  const userId = req.user.id;
  const productId = req.body.productId;
  const quantity = parseInt(req.body.quantity, 10);

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "productId and valid quantity are required" });
  }

  // Check if already in cart
  db.query(
    "SELECT * FROM cart WHERE userId = ? AND productId = ?",
    [userId, productId],
    (err, results) => {
      if (err) {
        console.error("SELECT ERROR:", err.sqlMessage);
        return res.status(500).json({ message: "DB error", error: err.sqlMessage });
      }

      if (results.length > 0) {
        // Update quantity
        const newQty = results[0].quantity + quantity;
        db.query(
          "UPDATE cart SET quantity = ? WHERE id = ?",
          [newQty, results[0].id],
          (err2) => {
            if (err2) {
              console.error("UPDATE ERROR:", err2.sqlMessage);
              return res.status(500).json({ message: "Failed to update", error: err2.sqlMessage });
            }
            res.json({ message: "Added to cart successfully" });
          }
        );
      } else {
        // Insert new item
        db.query(
          "INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)",
          [userId, productId, quantity],
          (err3, result) => {
            if (err3) {
              console.error("INSERT ERROR:", err3.sqlMessage);
              return res.status(500).json({ message: "Failed to add to cart", error: err3.sqlMessage });
            }
            console.log("INSERT SUCCESS:", result);
            res.json({ message: "Added to cart successfully" });
          }
        );
      }
    }
  );
});

// -----------------------------
// Get Cart Items
// -----------------------------
router.get("/", auth, (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT c.id, c.productId, c.quantity, p.name, p.price, p.image
     FROM cart c
     JOIN products p ON c.productId = p.id
     WHERE c.userId = ?`,
    [userId],
    (err, results) => {
      if (err) {
        console.error("GET CART ERROR:", err.sqlMessage);
        return res.status(500).json({ message: "Failed to fetch cart", error: err.sqlMessage });
      }
      res.json(results);
    }
  );
});

// -----------------------------
// Remove from Cart
// -----------------------------
router.delete("/:id", auth, (req, res) => {
  const cartId = req.params.id;

  db.query("DELETE FROM cart WHERE id = ?", [cartId], (err) => {
    if (err) {
      console.error("DELETE CART ERROR:", err.sqlMessage);
      return res.status(500).json({ message: "Failed to remove item", error: err.sqlMessage });
    }
    res.json({ message: "Removed successfully" });
  });
});

export default router;
