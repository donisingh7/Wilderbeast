const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  try {
    const { car, rating, comment } = req.body;
    const user = req.user._id; // From auth middleware

    const review = new Review({
      user,
      car,
      rating,
      comment
    });

    await review.save();
    
    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name')
      .populate('car', 'make model');

    res.status(201).json(populatedReview);
  } catch (err) {
    console.error('Error in createReview:', err);
    if (err.code === 11000) {
      return res.status(409).json({ message: 'You have already reviewed this car' });
    }
    res.status(500).json({ message: 'Server error creating review' });
  }
};

exports.listReviews = async (req, res) => {
  try {
    const filter = {};
    if (req.query.car) {
      filter.car = req.query.car;
    }

    const reviews = await Review.find(filter)
      .populate('user', 'name')
      .populate('car', 'make model')
      .sort('-createdAt');

    res.json(reviews);
  } catch (err) {
    console.error('Error in listReviews:', err);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId)
      .populate('user', 'name')
      .populate('car', 'make model');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (err) {
    console.error('Error in getReviewById:', err);
    res.status(500).json({ message: 'Server error fetching review' });
  }
};


exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const user = req.user._id;

    const review = await Review.findOneAndUpdate(
      { _id: req.params.reviewId, user },
      { rating, comment },
      { new: true, runValidators: true }
    ).populate('user', 'name').populate('car', 'make model');

    if (!review) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }

    res.json(review);
  } catch (err) {
    console.error('Error in updateReview:', err);
    res.status(500).json({ message: 'Server error updating review' });
  }
};


exports.deleteReview = async (req, res) => {
  try {
    const user = req.user._id;
    const review = await Review.findOneAndDelete({ _id: req.params.reviewId, user });

    if (!review) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }

    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error('Error in deleteReview:', err);
    res.status(500).json({ message: 'Server error deleting review' });
  }
};
