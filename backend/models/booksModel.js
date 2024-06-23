const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  reviews: [
    {
      rating: Number,
      feedback: String,
    },
  ],
});

module.exports = new mongoose.model("books", bookSchema);
