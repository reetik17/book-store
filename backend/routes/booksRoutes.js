const router = require("express").Router();
const bookModel = require("../models/booksModel");

router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const newBook = new bookModel(data);
    await newBook.save().then(() => {
      res.status(200).json({ message: "Book Added" });
    });
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
});

router.get("/getBooks", async (req, res) => {
  let books;
  try {
    books = await bookModel.find();
    res.status(200).json({ books });
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
});

router.get("/books/:id/reviews", async (req, res) => {
  const book = await bookModel.findById(req.params.id);
  res.json({ reviews: book.reviews });
});

router.post("/books/:id/reviews", async (req, res) => {
  const book = await bookModel.findById(req.params.id);
  book.reviews.push(req.body);
  await book.save();
  res.json({ review: req.body });
});

module.exports = router;
