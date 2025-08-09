const router = require('express').Router();
const { submitContactForm, getAllContacts } = require('../controllers/contactController');

router.post('/', submitContactForm);   
router.get('/', getAllContacts);      

module.exports = router;
