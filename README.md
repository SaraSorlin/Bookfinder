# Bookfinder

Detta API är för närvarande i version 0.9.1.1.

API¨t tillåter användare att interagera med en databas för en bokhandel, inklusive operationer för att hantera böcker och författare. Det är byggt med Node.js, Express och MongoDB.

Bas-URL
Alla URL:er som refereras i dokumentationen har följande bas:
http://localhost:3000/api

Denna bas-URL kommer att ändras beroende på driftsmiljön.

Autentisering
Detta API använder inga API-nycklar än för att tillåta åtkomst till API:t.

Felhantering
200 OK` - Begäran har lyckats.
400 Felaktig Begäran` - Servern kunde inte förstå begäran på grund av ogiltig syntax.
404 Hittades Inte` - Den begärda resursen kunde inte hittas.
500 Internt Serverfel - Servern stötte på ett problem som den inte vet hur den skall hantera
Creates a new book entry in the database.

Installation

npm install

express mongoose

Start av server

node server.js
 
