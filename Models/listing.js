const mongoose = require("mongoose");
const Review = require("./review");
const Schema= mongoose.Schema;

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1495562569060-2eec283d3391?fm=jpg&q=60&w=3000",
    },
  },

  price: Number,
  location: String,
  country: String,
  reviews : [
    {
      type : Schema.Types.ObjectId,
      ref : "Review"
    },
  ]
});

listingSchema.post("findOneAndDelete", async function (listing){
  if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});
  }
});

module.exports = mongoose.model("Listing", listingSchema);