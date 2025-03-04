import messagesSchemas from "../schema/messages.schema.js";
import movieSchemas from "../schema/movie.schema.js";
import sessionSchemas from "../schema/session.schema.js";
import userSchemas from "../schema/user.schema.js";
import {CustomError, ResData} from "../utils/res-helpers.js";
import {movieValidator} from "../validator/movie.validator.js";
import {sessionValidator} from "../validator/session.validator.js";

export const getUsers = async (req, res, next) => {
	try {
		const users = await userSchemas.find({role: {$ne: "admin"}});
		if (!users.length) throw new CustomError(404, "No users found");

		const resData = new ResData(200, "Users retrieved successfully", users);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const sendUserMessage = async (req, res, next) => {
	try {
		const {message} = req.body;
		if (!message) throw new CustomError(400, "Message is required");
		const userId = req.userId;
		await messagesSchemas.create({userId, content: message});

		const resData = new ResData(201, "Message sent successfully");
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const getUserMessages = async (req, res, next) => {
	try {
		const messages = await messagesSchemas.find().populate("userId");
		const resData = new ResData(
			200,
			messages.length ? "Messages retrieved successfully" : "No messages found",
			messages
		);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const editUser = async (req, res, next) => {
	try {
		const {id} = req.params;
		const {role, isBlocked} = req.body;

		if (!id) throw new CustomError(400, "User ID is required");
		if (role && !["admin", "user"].includes(role))
			throw new CustomError(400, "Invalid role");
		if (isBlocked !== undefined && typeof isBlocked !== "boolean")
			throw new CustomError(400, "Invalid isBlocked value");

		const updateData = {};
		if (role) updateData.role = role;
		if (isBlocked !== undefined) updateData.isBlocked = isBlocked;

		const editedUser = await userSchemas.findByIdAndUpdate(id, updateData, {
			new: true,
		});

		if (!editedUser) throw new CustomError(404, "User not found");

		const resData = new ResData(200, "User updated successfully", editedUser);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const postManyMovies = async (req, res, next) => {
	try {
		const movies = req.body;

		if (!Array.isArray(movies) || !movies.length) {
			throw new CustomError(400, "Movies array is required");
		}

		for (const movie of movies) {
			const {error} = movieValidator.validate(movie);
			if (error) throw new CustomError(400, error.details[0].message);
		}

		const newMovies = await movieSchemas.insertMany(movies);

		const resData = new ResData(201, "Movies created successfully", newMovies);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const postManySessions = async (req, res, next) => {
	try {
		const sessions = req.body;

		if (!Array.isArray(sessions) || !sessions.length) {
			throw new CustomError(400, "Sessions array is required");
		}

		for (const session of sessions) {
			const {error} = sessionValidator.validate(session);
			if (error) throw new CustomError(400, error.details[0].message);
		}

		const newSessions = await sessionSchemas.insertMany(sessions);

		const resData = new ResData(
			201,
			"Sessions created successfully",
			newSessions
		);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};
