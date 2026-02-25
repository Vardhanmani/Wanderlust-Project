const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();


//index
module.exports.index = (async (req, res) => {
  const allListing = await prisma.listing.findMany();
  res.render("listings/index", { allListing });
});


//new rout
module.exports.rendernewform =  (req, res) => {
  res.render("listings/new");
};

//show rout
module.exports.showrout = (async (req, res) => {
  const listing = await prisma.listing.findUnique({
  where: { id: req.params.id },
  include: {
    owner: true,     
    reviews: {
      include : {
        author : true,
      }
    }
  },
});


  if (!listing) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listing");
  }

  res.render("listings/show", { listing });
});

//creating
module.exports.createlisting = async (req, res) => {
  try {
    const listingData = req.body.listing;

    const newListing = await prisma.listing.create({
      data: {
        title: listingData.title,
        description: listingData.description,

        //  SAFE IMAGE HANDLING
        imageUrl:
          listingData.imageUrl && listingData.imageUrl.trim() !== ""
            ? listingData.imageUrl
            : null,

        price: Number(listingData.price),
        location: listingData.location,
        country: listingData.country,
        ownerId: req.user.id,
      },
    });

    req.flash("success", "New listing created!");
    res.redirect(`/listing/${newListing.id}`);

  } catch (err) {
    console.log(err);
    req.flash("error", "Failed to create listing");
    res.redirect("/listing");
  }
};
//edit

module.exports.editlisting = (async (req, res) => {
  const listing = await prisma.listing.findUnique({
    where: { id: req.params.id }
  });


  if (!listing) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listing");
  }

  res.render("listings/edit", { listing });
});
//update
module.exports.updatelisting = async (req, res) => {
  try {
    const { id } = req.params;
    const listingData = req.body.listing;

    //  Get existing listing
    const existingListing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!existingListing) {
      req.flash("error", "Listing does not exist");
      return res.redirect("/listing");
    }

    //  Update safely
    await prisma.listing.update({
      where: { id },
      data: {
        title: listingData.title,
        description: listingData.description,
        price: Number(listingData.price),
        location: listingData.location,
        country: listingData.country,

        //  CRITICAL IMAGE FIX
        imageUrl:
          listingData.imageUrl && listingData.imageUrl.trim() !== ""
            ? listingData.imageUrl
            : existingListing.imageUrl,
      },
    });

    req.flash("success", "Listing updated!");
    res.redirect(`/listing/${id}`);

  } catch (err) {
    console.log(err);
    req.flash("error", "Failed to update listing");
    res.redirect("/listing");
  }
};

//search
module.exports.searchlisting = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.redirect("/listing");
    }

    const listings = await prisma.listing.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            country: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    res.render("listings/index", { allListing: listings });

  } catch (err) {
    console.log(err);
    req.flash("error", "Search failed");
    res.redirect("/listing");
  }
};

//delete
module.exports.deletelisting = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.listing.delete({
      where: { id }
    });

    req.flash("success", "Listing deleted!");
    res.redirect("/listing");

  } catch (err) {
    console.log(err);
    req.flash("error", "Delete failed");
    res.redirect("/listing");
  }
};