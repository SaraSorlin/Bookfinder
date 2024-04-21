import mongoose from "mongoose";
import { faker } from '@faker-js/faker';

// Anslutning till MongoDB
const uri = "mongodb+srv://sara:120117@cluster0.imwjqrl.mongodb.net/Bokhandel";
mongoose.connect(uri);

// Schema för författare
const authorsSchema = new mongoose.Schema({
  author: String,  // Författarens namn
  book: String     // Namnet på boken författaren har skrivit
}, { versionKey: false });

// Schema för böcker
const booksSchema = new mongoose.Schema({
  Name: String,
  ISBN: Number,
  Price: Number,
  Genre: String,
  ReleaseDate: Date
}, { versionKey: false });

const Author = mongoose.model("authors", authorsSchema);
const Book = mongoose.model("books", booksSchema);

async function generateData() {
  try {
    await mongoose.connection.dropCollection('authors');
    await mongoose.connection.dropCollection('books');

    for (let i = 0; i < 50; i++) {
      const bookName = faker.commerce.productName();
      const newBook = new Book({
        Name: bookName,
        ISBN: faker.number.int({ min: 1000000000000, max: 9999999999999 }),
        Price: parseFloat(faker.commerce.price({ min: 100, max: 500, dec: 0 })),
        Genre: faker.music.genre(),
        ReleaseDate: faker.date.past({ years: 10 })
      });

      await newBook.save();

      const newAuthor = new Author({
        author: faker.person.fullName(),
        book: bookName
      });

      await newAuthor.save();
    }

    console.log("50 författare och böcker har genererats och sparats i databasen.");
  } catch (e) {
    console.error("Error during data generation", e);
  } finally {
    await mongoose.disconnect();
  }
}

generateData();
