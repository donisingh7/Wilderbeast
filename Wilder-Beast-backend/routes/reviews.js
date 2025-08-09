const router = require("express").Router();
const { 
  createReview, 
  listReviews, 
  getReviewById, 
  updateReview, 
  deleteReview 
} = require("../controllers/reviewController");

const verifyToken = require("../middleware/auth"); 

router.get("/", listReviews);
router.get("/:reviewId", getReviewById);

router.post("/", verifyToken, createReview);       
router.put("/:reviewId", verifyToken, updateReview);
router.delete("/:reviewId", verifyToken, deleteReview);

module.exports = router;
