const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
//create review
module.exports.createreview = (async (req, res) => {
    const { id } = req.params;

    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listing");
    }

    const { rating, comment } = req.body.review;

    await prisma.review.create({
      data: {
        rating: parseInt(rating),
        comment,
        listingId: id,        //  connect listing
        authorId: req.user.id //  REQUIRED (review owner)
      },
    });

    req.flash("success", "New review created!");
    res.redirect(`/listing/${id}`);
  });

  //delete review 

  module.exports.deletereview = (async (req, res) => {
    const { id, reviewId } = req.params;

    await prisma.review.delete({
      where: { id: reviewId },
    });

    req.flash("success", "Review deleted!");
    res.redirect(`/listing/${id}`);
  });

