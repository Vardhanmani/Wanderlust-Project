const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {

    //  SAVE ONLY SAFE GET REQUESTS
    if (req.method === "GET") {
      req.session.returnTo = req.originalUrl;
    }

    req.flash("error", "You must be logged in first");
    return res.redirect("/login");
  }
  next();
};


module.exports.isReviewOwner = async (req, res, next) => {
  const { reviewId, id } = req.params;

  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listing/${id}`);
  }

  if (review.authorId !== req.user.id) {
    req.flash("error", "You are not authorized");
    return res.redirect(`/listing/${id}`);
  }

  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;

  const listing = await prisma.listing.findUnique({
    where: { id }
  });

  if (!listing || listing.ownerId !== req.user.id) {
    req.flash("error", "You do not have permission");
    return res.redirect(`/listing/${id}`);
  }

  next();
};

module.exports.saveReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};