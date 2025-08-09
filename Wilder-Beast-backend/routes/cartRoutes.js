const express = require("express");
const { getCart, addToCart, removeFromCart } = require("../controllers/cartController");
// FIX: Changed the require path to point to the correct 'auth.js' file
const authMiddleware = require("../middleware/auth"); 

const router = express.Router();

// The rest of the file is the same
router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);
router.delete("/:carId", authMiddleware, removeFromCart);

module.exports = router;
