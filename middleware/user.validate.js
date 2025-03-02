import {userValidator} from "../validator/user.validator.js";

export const validateUser = (req, res, next) => {
	try {
		const {error} = userValidator.validate(req.body);
		if (error) throw new Error(error.details[0].message);
		next();
	} catch (error) {
		next(error);
	}
};
