
import Author from "../model/model-authors.js";
export default function author(server, mongoose) {



  server.get('/api/authors', async (req, res) => {
    try {
      const authors = await Author.find();  // Använder Mongoose's "find"-metod för att hämta alla "authors".
      res.json(authors);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av författare." });
    }
  });

  // Skapar en GET-route för att hämta en specifik författare med ett specifikt ID.
  server.get('/api/authors/:id', async (req, res) => {
    try {
      const author = await Author.findById(req.params.id); // Hämtar författaren med ID från databasen.
      if (!author) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }
      res.json(author);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en författare." });
    }
  });

  // Skapar en POST-route för att lägga till en ny författare.
  server.post('/api/authors', async (req, res) => {
    try {
      const newAuthor = new Author({
        author: req.body.author, // Fixat stavfel här
        book: req.body.book // Fixat stavfel här
      });

      const savedAuthor = await newAuthor.save(); // Spara den nya författaren i databasen.

      res.status(201).json(savedAuthor); // Skicka tillbaka den sparade författaren som JSON.

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid skapande av ny författare." });
    }
  });

  // Skapar en PUT-route för att uppdatera en författare med ett specifikt ID.
  server.put('/api/authors/:id', async (req, res) => {
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body); // Returnerar den uppdaterade författaren.
      if (!updatedAuthor) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }
      res.json(updatedAuthor); // Skickar tillbaka den uppdaterade författaren som JSON.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid uppdatering av författare." });
    }
  });

  // Skapar en DELETE-route för att radera en författare med ett specifikt ID.
  server.delete('/api/authors/:id', async (req, res) => {
    try {
      const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
      if (!deletedAuthor) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }
      res.json({ message: "Författaren har raderats!" }); // Bekräftelse på att författaren har raderats.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid radering av författare." });
    }
  });

}
