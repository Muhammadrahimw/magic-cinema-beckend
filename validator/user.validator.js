import Joi from "joi";

export const userValidator = Joi.object({
	firstName: Joi.string()
		.min(3)
		.max(50)
		.pattern(/^[a-zA-Z]+$/)
		.required()
		.messages({
			"string.pattern.base":
				"First name can only contain alphabetical characters",
		}),
	lastName: Joi.string()
		.min(3)
		.max(50)
		.pattern(/^[a-zA-Z]+$/)
		.required()
		.messages({
			"string.pattern.base":
				"Last name can only contain alphabetical characters",
		}),
	email: Joi.string().email().required(),
	password: Joi.string().min(5).required(),
});

export const verifyEmailValidator = Joi.object({
	email: Joi.string().email().required(),
	code: Joi.string().required().min(6),
});

export const signInValidator = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(5).required(),
});

export const updatePasswordValidator = Joi.object({
	oldPassword: Joi.string().min(5).required(),
	newPassword: Joi.string().min(5).required(),
});
