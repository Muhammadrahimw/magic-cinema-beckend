import Joi from "joi";

export const sessionValidator = Joi.object({
	movieId: Joi.string().length(24).required(),
	date: Joi.string().valid("today", "tomorrow").required(),
	time: Joi.array()
		.items(
			Joi.string()
				.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
				.messages({
					"string.pattern.base":
						"Each time must be in HH:mm format (e.g., 14:30)",
				})
		)
		.min(1)
		.max(3)
		.required()
		.messages({
			"array.min": "At least one time must be provided",
			"array.max": "No more than three times are allowed",
		}),
	price: Joi.number().positive().required(),
	places: Joi.alternatives().conditional("time", {
		is: Joi.array().min(1).max(3),
		then: Joi.array()
			.items(Joi.number().integer().min(1).max(20))
			.length(Joi.ref("time.length"))
			.required()
			.messages({
				"array.length": "Places array must match the number of time values.",
				"array.includes": "Each seat count must be between 1 and 20!",
			}),
	}),
});
