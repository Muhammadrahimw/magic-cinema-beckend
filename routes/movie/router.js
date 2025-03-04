import {Router} from "express";
import {
	deleteMovie,
	getComingSoon,
	getMovieById,
	getMovies,
	postMovie,
	updateMovie,
	uploadImage,
} from "../../controllers/movie.controller.js";
import {validateMovie} from "../../middleware/movie.middleware.js";
import {verifyAdmin} from "../../middleware/auth.middleware.js";
import {upload} from "../../utils/helpers.js";

const router = Router();

router.get(`/`, getMovies);
router.get(`/coming-soon`, getComingSoon);
router.get(`/:id`, getMovieById);
router.post(`/`, validateMovie, verifyAdmin, postMovie);
router.put(`/:id`, validateMovie, verifyAdmin, updateMovie);
router.delete(`/:id`, verifyAdmin, deleteMovie);
router.post(`/upload-image`, upload.single("image"), uploadImage);

export {router};
