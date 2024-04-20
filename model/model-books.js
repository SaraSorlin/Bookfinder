import mongoose from "mongoose";
const booksSchema = new mongoose.Schema({
  Name: String, // Varje "book" har ett "namn".
  ISBN: Number, // Varje "book" har ett "ISBN".
  Price: Number, // Varje "book" har ett "pris".
  Genre: String,
  ReleaseDate: Date // Varje "book" har en "genre".
}, { versionKey: false });

const Book = mongoose.model("books", booksSchema);

export default Book;