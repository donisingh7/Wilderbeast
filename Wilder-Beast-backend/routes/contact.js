const { submitContact } = require('../controllers/contactController');
const router = require('express').Router();

router.post('/', submitContact);

module.exports = router;
