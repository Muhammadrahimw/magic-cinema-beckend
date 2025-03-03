import jwt from "jsonwebtoken";
import {CustomError} from "../utils/res-helpers.js";

export const verifyToken = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) throw new CustomError(401, `Access denied, No token provided`);
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.userId = decoded.id;
		next();
	} catch (error) {
		next(error);
	}
};

export const verifyAdmin = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) throw new CustomError(401, `Access denied. No token provided`);
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		console.log(decoded.role);

		if (decoded.role !== "admin")
			throw new CustomError(
				403,
				"Access denied. Only admin can access this resource"
			);
		req.userId = decoded.id;
		req.userRole = decoded.role;
		next();
	} catch (error) {
		next(error);
	}
};

export const verifyQueryToken = (req, res, next) => {
	try {
		const {token} = req.query;
		if (!token) throw new CustomError(401, `Access denied. No token provided`);
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.userId = decoded.id;
		if (decoded.email) req.userEmail = decoded.email;

		next();
	} catch (error) {
		next(error);
	}
};