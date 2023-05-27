const Review = require("../models/ratingModel");
const router = require("express").Router();
const User = require("../models/usersModel");
const authMiddleware = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");

// add review

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();

    const userId = new mongoose.Types.ObjectId(req.body.user);
    const averageRating = await Review.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: "$user",
          averageRating: { $avg: "$rating" }
        },
      },
    ]);

    const averageRatingValue = averageRating[0]?.averageRating || 0;

    await User.findOneAndUpdate(userId, {
      rating: averageRatingValue
    });

    res.status(200).json({ message: "Відгук додано успішно", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get all reviews by user id

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find(req.query || {}).sort({ createdAt: -1 }).populate("user");
    res.status(200).json({ data: reviews, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// delete review

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.body._id);
    const userId = new mongoose.Types.ObjectId(req.body.user);
    const averageRating = await Review.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: "$user",
          averageRating: { $avg: "$rating" }
        },
      },
    ]);

    const averageRatingValue = averageRating[0]?.averageRating || 0;

    await User.findOneAndUpdate(userId, {
      rating: averageRatingValue
    });

    res
      .status(200)
      .json({ message: "Відгук успішно видалено", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});


module.exports = router;