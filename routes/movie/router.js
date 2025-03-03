import {Router} from "express";
import {
	deleteMovie,
	getMovieById,
	getMovies,
	postMovie,
	updateMovie,
} from "../../controllers/movie.controller.js";
import {validateMovie} from "../../middleware/movie.middleware.js";
import {verifyAdmin} from "../../middleware/auth.middleware.js";

const router = Router();

router.get(`/`, getMovies);
router.get(`/:id`, getMovieById);
router.post(`/`, validateMovie, verifyAdmin, postMovie);
router.put(`/:id`, validateMovie, verifyAdmin, updateMovie);
router.delete(`/:id`, verifyAdmin, deleteMovie);

export {router};
