import author from "./api/authors.js";
import books from "./api/books.js";

export default function (server, mongoose) {

  author(server, mongoose)
  books(server, mongoose)

}