import {sessionValidator} from "../validator/session.validator.js";

export const validateSession = (req, res, next) => {
	try {
		const {error} = sessionValidator.validate(req.body);
		if (error) throw new Error(error.details[0].message);
		next();
	} catch (error) {
		next(error);
	}
};
