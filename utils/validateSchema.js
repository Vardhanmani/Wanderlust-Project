const { userSchema, listingSchema, reviewSchema } = require("../schema");
const expressError = require("./expressError");

module.exports.validateUser = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(d => d.message).join(", ");
    throw new expressError(400, msg);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  const { error, value } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(d => d.message).join(", ");
    throw new expressError(400, msg);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error, value } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(d => d.message).join(", ");
    throw new expressError(400, msg);
  }
  next();
};
