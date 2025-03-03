import {
	signInValidator,
	updatePasswordValidator,
	userValidator,
	verifyEmailValidator,
} from "../validator/user.validator.js";

export const validateUser = (req, res, next) => {
	try {
		const {error} = userValidator.validate(req.body);
		if (error) throw new Error(error.details[0].message);
		next();
	} catch (error) {
		next(error);
	}
};

export const validateVerifyEmail = (req, res, next) => {
	try {
		const {error} = verifyEmailValidator.validate(req.body);
		if (error) throw new Error(error.details[0].message);
		next();
	} catch (error) {
		next(error);
	}
};

export const validateSignIn = (req, res, next) => {
	try {
		const {error} = signInValidator.validate(req.body);
		if (error) throw new Error(error.details[0].message);
		next();
	} catch (error) {
		next(error);
	}
};

export const validateUpdatePassword = (req, res, next) => {
	try {
		const {error} = updatePasswordValidator.validate(req.body);
		if (error) throw new Error(error.details[0].message);
		next();
	} catch (error) {
		next(error);
	}
};
