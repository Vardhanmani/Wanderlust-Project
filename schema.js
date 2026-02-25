const Joi = require("joi");


//  LISTING SCHEMA (FIXED)
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().min(0).required(),

    //  CORRECT FIELD — MATCHES FORM
    imageUrl: Joi.string().uri().allow("", null)

  }).required()
});


//  REVIEW SCHEMA (UNCHANGED)
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
  }).required()
});


//  SIGNIN SCHEMA (UNCHANGED)
module.exports.signinschema = Joi.object({
  signin: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
});


//  USER SCHEMA (UNCHANGED)
module.exports.userSchema = Joi.object({
  user: Joi.object({
    username: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
  }).required()
});
