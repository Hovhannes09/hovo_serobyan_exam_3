import express from "express";
import {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
} from "../controllers/filmController.js";

const router = express.Router();

router.get("/films", getAllFilms);
router.get("/films/:id", getFilmById);
router.post("/films", createFilm);
router.put("/films/:id", updateFilm);
router.delete("/films/:id", deleteFilm);

export default router;
