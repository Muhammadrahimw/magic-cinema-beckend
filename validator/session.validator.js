import Joi from "joi";

export const sessionValidator = Joi.object({
	movieId: Joi.string().length(24).required(),
	time: Joi.date().iso().required(),
	price: Joi.number().positive().required(),
	places: Joi.number().integer().min(1).max(20).default(20),
});
