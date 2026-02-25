const express = require("express");
const router = express.Router();

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const wrapAsync = require("../utils/wrapasync");
const expressError = require("../utils/expressError");
const { listingSchema } = require("../schema");
const { isLoggedIn, isOwner } = require("../middleware");

const listingcontroller = require("../controllers/listing");


// VALIDATION
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    return next(new expressError(400, msg));
  }
  next();
};


// INDEX
router.get("/", wrapAsync(listingcontroller.index));


// ✅ SEARCH ROUTE (MUST BE HERE)
router.get("/search", wrapAsync(listingcontroller.searchlisting));


// NEW
router.get("/new", isLoggedIn, listingcontroller.rendernewform);


// SHOW
router.get("/:id", wrapAsync(listingcontroller.showrout));


// CREATE
router.post("/", isLoggedIn, validateListing, wrapAsync(listingcontroller.createlisting));


// EDIT
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingcontroller.editlisting));


// UPDATE
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingcontroller.updatelisting));


// DELETE
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingcontroller.deletelisting));


module.exports = router;