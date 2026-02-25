const express = require("express");
const router = express.Router({ mergeParams: true });

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const wrapAsync = require("../utils/wrapasync");
const expressError = require("../utils/expressError");
const { reviewSchema } = require("../schema");
const { isLoggedIn, isReviewOwner } = require("../middleware"); 

const reviewcontroller = require("../controllers/review");

// VALIDATE REVIEW
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    return next(new expressError(400, msg));
  }
  next();
};

// CREATE REVIEW
router.post(
  "/",
  isLoggedIn,          
  validateReview,
  wrapAsync(reviewcontroller.createreview));

// DELETE REVIEW (OWNER ONLY)
router.delete(
  "/:reviewId",
  isLoggedIn,          
  isReviewOwner,      
  wrapAsync(reviewcontroller.deletereview));


module.exports = router;
