import {movieValidator} from "../validator/movie.validator.js";

export const validateMovie = (req, res, next) => {
	try {
		const {error} = movieValidator.validate(req.body);
		if (error) throw new Error(error.details[0].message);
		next();
	} catch (error) {
		next(error);
	}
};
