const Product = require('../models/Product');

exports.listAccessories = async (req, res) => {
  try {
    const accessories = await Product.find().sort('category');
    res.json(accessories);
  } catch (err) {
    console.error('Error in listAccessories:', err);
    res.status(500).json({ message: 'Server error fetching accessories' });
  }
};

exports.getAccessoriesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const accessories = await Product.find({ category }).sort('item');
    res.json(accessories);
  } catch (err) {
    console.error('Error in getAccessoriesByCategory:', err);
    res.status(500).json({ message: 'Server error fetching accessories by category' });
  }
};

exports.getAccessoryById = async (req, res) => {
  try {
    const accessory = await Product.findById(req.params.id);
    if (!accessory) return res.status(404).json({ message: 'Accessory not found' });
    res.json(accessory);
  } catch (err) {
    console.error('Error in getAccessoryById:', err);
    res.status(500).json({ message: 'Server error fetching accessory' });
  }
}; 