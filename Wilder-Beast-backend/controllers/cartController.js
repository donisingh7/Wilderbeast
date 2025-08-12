const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {
  try {
    const { carId } = req.body;

    if (!carId) {
      return res.status(400).json({ message: "Car ID is required" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.car.toString() === carId
    );

    if (existingItem) {
      return res.status(400).json({ message: "Car already in cart" });
    }

    cart.items.push({ car: carId });
    await cart.save();

    
    const populatedCart = await Cart.findById(cart._id).populate("items.car");
    res.json(populatedCart);

  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.car");

    if (!cart) {
      return res.json({ items: [] });
    }
    
    
    res.json(cart);

  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart", error });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    
    const { carId } = req.params; 

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    
    cart.items = cart.items.filter(
      (item) => item.car.toString() !== carId
    );

    await cart.save();
    
    
    const populatedCart = await Cart.findById(cart._id).populate("items.car");
    res.status(200).json(populatedCart);

  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Error removing from cart", error });
  }
};


exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
