Jag satsar på betyg G 

Bookfinder API
Version: 0.9.1.1

Beskrivning:
Bookfinder API tillhandahåller en flexibel lösning för att hantera en databas med böcker och författare för bokhandlare. Det stöder operationer som lägg till, ta bort, uppdatera och hämta bokinlägg.

Teknologier och Arkitektur
API:t är utvecklat med:

Node.js: 
Express:
MongoDB: En NoSQL-databas hostad  i molnet på nedan plats

mongodb+srv://sara:120117@cluster0.imwjqrl.mongodb.net/Bokhandel

Bas-URL
Alla URL:er som refereras i dokumentationen utgår från:
http://localhost:3000/api

Autentisering
Detta API använder inga API-nycklar än för att tillåta åtkomst till API:t.



Installation
Förutsättningar:
Innan du installerar Bookfinder API, se till att du har följande programvara installerad:

Node.js: Ladda ner och installera Node.js från nodejs.org, vilket även kommer att installera npm (node package manager).
MongoDB: Se till att du har MongoDB installerat och körande. Du kan följa instruktionerna på MongoDB:s officiella webbplats för att installera MongoDB lokalt eller ställa in en instans med en molntjänst.


Installera npm-paket:
Kör följande kommando i terminalen inuti projektmappen för att installera de nödvändiga paketen som anges i package.json:
npm install
npm install express mongoose
node server.js




Du bör se en utskrift i terminalen som bekräftar att servern körs, vanligtvis något i stil med "Server running on http://localhost:3000".

Verifiera installationen:
För att verifiera att API:et fungerar korrekt efter installationen, kan du göra en enkel GET-förfrågan mot API:et genom att öppna följande URL i en webbläsare eller använda ett verktyg som Postman:

http://localhost:3000/api/books
Du bör få ett JSON-svar som listar de böcker som finns i databasen, vilket bekräftar att installationen och konfigurationen är korrekt.


Användning och Exempel
För att komma igång med att använda API:t, se detaljerad dokumentation och exempel här:
/API Dokumentation/Sara Sörlin Bookfinder API.docx

Postman collection
https://api.postman.com/collections/33817987-175c137c-216b-4bdf-80da-04f014ab1234?access_key=PMAT-01HVZ5881GXWTV9H7FS4VM362C

 

Felhantering
API:et hanterar fel genom att ge tydliga statuskoder:

200 OK: Begäran har lyckats.
400 Felaktig Begäran: Servern kunde inte förstå begäran på grund av ogiltig syntax.
404 Hittades Inte: Den begärda resursen kunde inte hittas.
500 Internt Serverfel: Servern stötte på ett problem som den inte vet hur den ska hantera.
Säkerhet och Autentisering
I nuläget använder inte detta API några API-nycklar för att tillåta åtkomst, vilket kan komma att ändras för att förbättra säkerheten.