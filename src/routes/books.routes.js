import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

import {
  addBook,
  getAllBooks,
  getBookDetails,
  updateBook,
  deleteBook,
} from "../controllers/books.controllers.js";

router.route("/").post(verifyToken, addBook).get(verifyToken, getAllBooks)// admin only for post public for get
router.route("/:id").get(verifyToken,getBookDetails).put(verifyToken,updateBook).delete(verifyToken,deleteBook) // public for get admin only for put and delete


export default router;