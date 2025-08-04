const router = require('express').Router();
const { 
  createReview, 
  listReviews, 
  getReviewById, 
  updateReview, 
  deleteReview 
} = require('../controllers/reviewController');
const auth = require('../middleware/auth');

router.get('/', listReviews);

router.get('/:reviewId', getReviewById);

router.post('/', auth, createReview);

router.put('/:reviewId', auth, updateReview);

router.delete('/:reviewId', auth, deleteReview);

module.exports = router;
