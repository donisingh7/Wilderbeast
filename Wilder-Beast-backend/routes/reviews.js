// routes/reviews.js
const router = require('express').Router();
const { 
  createReview, 
  listReviews, 
  getReviewById, 
  updateReview, 
  deleteReview 
} = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// Get all reviews (optional car filter)
router.get('/', listReviews);

// Get single review
router.get('/:reviewId', getReviewById);

// Create review (protected)
router.post('/', auth, createReview);

// Update review (protected)
router.put('/:reviewId', auth, updateReview);

// Delete review (protected)
router.delete('/:reviewId', auth, deleteReview);

module.exports = router;
