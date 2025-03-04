import movieSchemas from "../schema/movie.schema.js";
import sessionSchemas from "../schema/session.schema.js";
import {CustomError, ResData} from "../utils/res-helpers.js";

export const getSessions = async (req, res, next) => {
	try {
		const {search} = req.query;
		let sessions = await sessionSchemas.find().populate("movieId");

		if (search) {
			const regex = new RegExp(search, "i");
			sessions = sessions.filter(
				(session) => session.movieId && regex.test(session.movieId.title)
			);
		}

		const resData = new ResData(
			200,
			"Sessions retrieved successfully",
			sessions
		);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const postSession = async (req, res, next) => {
	try {
		const {movieId, time, date, price, places} = req.body;

		const movie = await movieSchemas.findById(movieId);
		if (!movie) throw new CustomError(404, "Movie not found");

		const session = await sessionSchemas.create({
			movieId,
			time,
			date,
			price,
			places,
		});

		const resData = new ResData(201, "Session created successfully", session);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const putSession = async (req, res, next) => {
	try {
		const {id} = req.params;

		const session = await sessionSchemas.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!session) throw new CustomError(404, "Session not found");

		const resData = new ResData(200, "Session updated successfully", session);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const deleteSession = async (req, res, next) => {
	try {
		const {id} = req.params;

		if (!id.match(/^[0-9a-fA-F]{24}$/)) {
			throw new CustomError(400, "Invalid session ID");
		}

		const session = await sessionSchemas.findByIdAndDelete(id);
		if (!session) throw new CustomError(404, "Session not found");

		const resData = new ResData(200, "Session deleted successfully", session);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};
