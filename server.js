// Importera Express för att kunna skapa en webbserver och Mongoose för att interagera med MongoDB-databasen.
import express from "express";
import mongoose from "mongoose";
import apiRegister from "./api-register.js";
import Book from "./model/model-books.js";  // Ändra sökvägen så att den matchar den faktiska placeringen av din modellfil

// Skapar en instans av Express-appen, detta är vår webbserver.
const server = express();

// Bestämmer vilken port som servern ska lyssna på.
const port = 3000;

/*
  Servern använder en middleware (express.json()) för att omvandla våra request till JSON.
  Detta gör att vi kan hantera JSON-data som skickas i request body.
*/
server.use(express.json());

/* 
  Vår MongoDB Atlas connection-string
  Ansluter till MongoDB-databasen med hjälp av Mongoose.
  Strängen innehåller: 
    Användarnamn - <username>
    Lösenord - <password>
    Databasnamnet (Optional) - <DB-Name>
*/
mongoose.connect("mongodb+srv://sara:120117@cluster0.imwjqrl.mongodb.net/Bokhandel", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB anslutning lyckades."))
  .catch(err => console.error("MongoDB anslutning misslyckades:", err));

// Pagination and error handling added to the searchBooks route
server.get("/api/books", async (req, res) => {
  try {
    // Extraherar sökparametrar från förfrågningen
    const { page = 1, limit = 100, name, isbn, price, genre, releaseDate } = req.query;
    const query = {};

    // Validerar och använder RegExp för skiftlägesokänslig matchning av boknamn
    if (name) {
      // Kontrollerar för ogiltiga tecken, tillåter Unicode-bokstäver samt specifika specialtecken
      if (/[^\p{L}\p{N}\s]/u.test(name)) {
        return res.status(400).json({ message: "Ogiltiga tecken i boknamnet." });
      }
      query.Name = { $regex: new RegExp(name, "i") };
    }

    // Exakt matchning för ISBN
    if (isbn) {
      if (/[^0-9]/.test(isbn)) {
        return res.status(400).json({ message: "Ogiltiga tecken i ISBN." });
      }
      query.ISBN = isbn;
    }

    // Prisfilter, returnerar böcker som kostar mindre än eller lika med angivet pris
    if (price) {
      if (!/^\d+(\.\d+)?$/.test(price)) {
        return res.status(400).json({ message: "Ogiltigt prisformat." });
      }
      query.Price = { $lte: price };
    }

    // Använder RegExp för skiftlägesokänslig matchning av genre
    if (genre) {
      // Kontrollerar för ogiltiga tecken
      if (/[^a-zA-Z\s]/.test(genre)) {
        return res.status(400).json({ message: "Ogiltiga tecken i genre." });
      }
      query.Genre = { $regex: new RegExp(genre, "i") };
    }

    // Datumfilter, returnerar böcker utgivna efter angivet datum
    if (releaseDate) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
        return res.status(400).json({ message: "Ogiltigt datumformat. Använd YYYY-MM-DD." });
      }
      query.ReleaseDate = { $gte: new Date(releaseDate) };
    }

    // Utför sökningen med de definierade parametrarna, begränsar resultatet baserat på sidnummer och antal resultat per sida
    const books = await Book.find(query)
      .limit(parseInt(limit, 10))
      .skip((page - 1) * parseInt(limit, 10))
      .exec();

    // Skickar tillbaka totalt antal träffar och de hittade böckerna
    res.json({ total: books.length, books });
  } catch (error) {
    // Hanterar fel som kan uppstå under databasförfrågan eller datahantering
    res.status(500).send({ message: "Server fel", error: error.toString() });
  }
});

apiRegister(server, mongoose);

/* 
  Startar servern så att den lyssnar på den definierade porten.
  När servern har startat, loggas ett meddelande till konsolen.
*/
server.listen(port, () => console.log(`Listening on port http://localhost:${port}`));
