import Book from "../model/model-books.js";

export default function books(server, mongoose) {
  // Hämtar alla böcker
  server.get('/api/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av böcker." });
    }
  });

  // Hämtar en specifik bok med ett specifikt ID
  server.get('/api/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Boken hittades inte" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en bok." });
    }
  });

  // Skapar en ny bok
  server.post('/api/books', async (req, res) => {
    try {
      const newBook = new Book({
        Name: req.body.Name,
        ISBN: req.body.ISBN,
        Price: req.body.Price,
        Genre: req.body.Genre,
        ReleaseDate: req.body.ReleaseDate
      });

      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid skapande av ny bok." });
    }
  });

  // Uppdaterar en befintlig bok
  server.put('/api/books/:id', async (req, res) => {
    try {
      const bookUpdate = {
        Name: req.body.Name,
        ISBN: req.body.ISBN,
        Price: req.body.Price,
        Genre: req.body.Genre,
        ReleaseDate: req.body.ReleaseDate
      };

      const updatedBook = await Book.findByIdAndUpdate(req.params.id, bookUpdate, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ message: "Boken hittades inte" });
      }
      res.json({ updated: true, book: updatedBook });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid uppdatering av bok." });
    }
  });


  // Raderar en bok
  server.delete('/api/books/:id', async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) {
        return res.status(404).json({ message: "Boken hittades inte" });
      }
      res.json({ message: "Boken har raderats!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid radering av bok." });
    }
  });
}
