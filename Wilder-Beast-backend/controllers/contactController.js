const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('❌ Error submitting contact form:', err);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort('-createdAt');
    res.json(contacts);
  } catch (err) {
    console.error('❌ Error fetching contacts:', err);
    res.status(500).json({ message: 'Server error fetching contacts.' });
  }
};
