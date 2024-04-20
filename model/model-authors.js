import mongoose from "mongoose";
const authorsSchema = new mongoose.Schema({
  author: String, // Varje "author" har ett "namn".
  book: String // Varje "author" har skrivit en "book".
}, { versionKey: false });

const Author = mongoose.model("authors", authorsSchema);

export default Author;