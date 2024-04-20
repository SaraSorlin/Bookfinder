import Book from "../model/model-books.js";
  

export default function books (server, mongoose) {

server.get('/api/books', async (req, res) => {
    try {
      const books = await Book.find();  // Använder Mongoose's "find"-metod för att hämta alla "books".
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av böcker." });
    }
  });

  // Skapar en GET-route för att hämta en specifik bok med ett specifikt ID.
  server.get('/api/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id); // Hämtar boken med ID från databasen.
      if (!book) {
        return res.status(404).json({ message: "Boken hittades inte" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en bok." });
    }
  });

  // Skapar en POST-route för att lägga till en ny bok.
  server.post('/api/books', async (req, res) => {
    try {
      const newBook = new Book({
        Name: req.body.Name,
        ISBN: req.body.ISBN,
        Price: req.body.Price,
        Genre: req.body.Genre // Lägg till genren från request body.
      });

      const savedBook = await newBook.save(); // Spara den nya boken i databasen.

      res.status(201).json(savedBook); // Skicka tillbaka den sparade boken som JSON.

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid skapande av ny bok." });
    }
  });

  // Skapar en PUT-route för att uppdatera en bok med ett specifikt ID.
  server.put('/api/books/:id', async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body); // Returnerar den uppdaterade boken.
      if (!updatedBook) {
        return res.status(404).json({ message: "Boken hittades inte" });
      }
      res.json(updatedBook); // Skickar tillbaka den uppdaterade boken som JSON.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid uppdatering av bok." });
    }
  });

  // Skapar en DELETE-route för att radera en bok med ett specifikt ID.
  server.delete('/api/books/:id', async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) {
        return res.status(404).json({ message: "Boken hittades inte" });
      }
      res.json({ message: "Boken har raderats!" }); // Bekräftelse på att boken har raderats.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid radering av bok." });
    }
  });

}
