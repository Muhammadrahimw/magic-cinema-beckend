import mongoose from "mongoose";
import movieSchemas from "../schema/movie.schema.js";
import {CustomError, ResData} from "../utils/res-helpers.js";
import {cloudinary} from "../config/cloudinary.js";
import fs from "fs/promises";

export const getMovies = async (req, res, next) => {
	try {
		const movies = await movieSchemas.find();
		if (!movies.length) throw new ResData(200, "No movies found", []);
		const resData = new ResData(200, "Movies retrieved successfully", [
			...movies,
		]);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const getMovieById = async (req, res, next) => {
	try {
		const {id} = req.params;
		const movie = await movieSchemas.findOne({_id: id});
		if (!movie) throw new ResData(404, "Movie not found", null);
		const resData = new ResData(200, "Movie retrieved successfully", movie);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const postMovie = async (req, res, next) => {
	try {
		const {
			title,
			description,
			genre,
			releaseDate,
			duration,
			rating,
			director,
			actors,
			posterUrl,
			state,
			ageLimit,
			additionalInfoId,
		} = req.body;

		const newMovie = await movieSchemas.create({
			title,
			description,
			genre,
			releaseDate,
			duration,
			rating,
			director,
			actors,
			posterUrl,
			state,
			ageLimit,
			additionalInfoId: additionalInfoId || null,
		});
		const resData = new ResData(201, "Movie created successfully", [newMovie]);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const updateMovie = async (req, res, next) => {
	try {
		const {
			title,
			description,
			genre,
			releaseDate,
			duration,
			rating,
			director,
			actors,
			posterUrl,
			state,
			ageLimit,
			additionalInfoId,
		} = req.body;

		const {id} = req.params;
		if (!id || !mongoose.Types.ObjectId.isValid(id))
			throw new CustomError(400, "Invalid movie ID");

		const updateMovie = await movieSchemas.findByIdAndUpdate(
			id,
			{
				title,
				description,
				genre,
				releaseDate,
				duration,
				rating,
				director,
				actors,
				posterUrl,
				state,
				ageLimit,
				additionalInfoId,
			},
			{new: true}
		);

		const resData = new ResData(200, "Movie updated successfully", updateMovie);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const deleteMovie = async (req, res, next) => {
	try {
		const {id} = req.params;
		if (!id || !mongoose.Types.ObjectId.isValid(id))
			throw new CustomError(400, "Invalid movie ID");

		const deletedMovie = await movieSchemas.findByIdAndDelete(id);
		if (!deletedMovie) throw new ResData(404, "Movie not found", null);
		const resData = new ResData(200, "Movie deleted successfully");
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const uploadImage = async (req, res, next) => {
	try {
		if (!req.file) throw new CustomError(400, "File not found");

		const result = await cloudinary.uploader.upload(req.file.path, {
			folder: "magic-cinema",
		});
		await fs.unlink(req.file.path);

		const resData = new ResData(200, "Image uploaded successfully", {
			url: result.secure_url,
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};
