import { Router } from "express";

const router = Router();

import {
  addBook,
  getAllBooks,
  getBookDetails,
  updateBook,
  deleteBook,
} from "../controllers/books.controller.js";

router.route("/books").post(addBook).get(getAllBooks)// admin only for post public for get
router.route("/books/:id").get(getBookDetails).put(updateBook).delete(deleteBook) // public for get admin only for put and delete


export default router;