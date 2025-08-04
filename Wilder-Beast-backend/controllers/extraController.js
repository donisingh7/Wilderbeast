const Extra = require('../models/Extra');

exports.listExtras = async (req, res) => {
  try {
    const extras = await Extra.find().sort('name');
    res.json(extras);
  } catch (err) {
    console.error('Error in listExtras:', err);
    res.status(500).json({ message: 'Server error fetching extras' });
  }
};

exports.getExtraById = async (req, res) => {
  try {
    const extra = await Extra.findById(req.params.id);
    if (!extra) return res.status(404).json({ message: 'Extra not found' });
    res.json(extra);
  } catch (err) {
    console.error('Error in getExtraById:', err);
    res.status(500).json({ message: 'Server error fetching extra' });
  }
};

exports.createExtra = async (req, res) => {
  try {
    const { name, description, dailyPrice } = req.body;
    const extra = await Extra.create({ name, description, dailyPrice });
    res.status(201).json(extra);
  } catch (err) {
    console.error('Error in createExtra:', err);
    res.status(500).json({ message: 'Server error creating extra' });
  }
};

exports.updateExtra = async (req, res) => {
  try {
    const updates = req.body;
    const extra = await Extra.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });
    if (!extra) return res.status(404).json({ message: 'Extra not found' });
    res.json(extra);
  } catch (err) {
    console.error('Error in updateExtra:', err);
    res.status(500).json({ message: 'Server error updating extra' });
  }
};

exports.deleteExtra = async (req, res) => {
  try {
    const extra = await Extra.findByIdAndDelete(req.params.id);
    if (!extra) return res.status(404).json({ message: 'Extra not found' });
    res.json({ message: 'Extra deleted' });
  } catch (err) {
    console.error('Error in deleteExtra:', err);
    res.status(500).json({ message: 'Server error deleting extra' });
  }
};
