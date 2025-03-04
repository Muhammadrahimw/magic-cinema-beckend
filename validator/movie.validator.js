import Joi from "joi";

export const movieValidator = Joi.object({
	title: Joi.string().required().min(3).max(50),
	description: Joi.string().required().min(10).max(5000),
	genre: Joi.array()
		.items(Joi.string().valid("Action", "Adventure", "Comedy", "Horror"))
		.min(1)
		.required(),
	releaseDate: Joi.string()
		.required()
		.regex(/^\d{4}-\d{2}-\d{2}$/)
		.message("releaseDate must be in YYYY-MM-DD format"),
	duration: Joi.number().required().min(1).max(1440),
	rating: Joi.number().required().min(0).max(10),
	director: Joi.string().required().min(3).max(50),
	actors: Joi.array()
		.items(Joi.string().required().min(1).max(20))
		.min(1)
		.max(20),
	posterUrl: Joi.string().uri().required(),
	state: Joi.string().required().min(2),
	ageLimit: Joi.number().required().min(0).max(18),
	comingSoon: Joi.boolean().default(false),
});
