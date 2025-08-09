const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.car");
    res.json(cart || { items: [] });
  } catch (err) {
    console.error("Error in getCart:", err);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { carId } = req.body;
    if (!carId) return res.status(400).json({ message: "Car ID is required" });

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [{ car: carId, quantity: 1 }] });
    } else {
      const existingItem = cart.items.find(item => item.car.toString() === carId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ car: carId, quantity: 1 });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("Error in addToCart:", err);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { carId } = req.params;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.car.toString() !== carId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error("Error in removeFromCart:", err);
    res.status(500).json({ message: "Error removing from cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { carId } = req.params;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.car.toString() !== carId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error removing from cart" });
  }
};
