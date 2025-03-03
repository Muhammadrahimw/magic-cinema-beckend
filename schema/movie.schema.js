import {Schema, model} from "mongoose";

const movieSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: [3, "Title must be at least 3 characters long"],
		},
		description: {
			type: String,
			required: true,
			minlength: [10, "Description must be at least 10 characters long"],
		},
		genre: {
			type: [String],
			required: true,
			enum: ["Action", "Adventure", "Comedy", "Horror"],
		},
		releaseDate: {
			type: String,
			required: true,
			validate: {
				validator: function (value) {
					return /^\d{4}-\d{2}-\d{2}$/.test(value);
				},
				message: (props) =>
					`${props.value} is an invalid format! It should be in YYYY-MM-DD format.`,
			},
		},
		duration: {
			type: Number,
			required: true,
			min: [1, "Duration must be at least 1 minute"],
			max: [1440, "Duration must be at most 24 hours"],
		},
		rating: {
			type: Number,
			required: true,
			min: [1, "Rating must be between 1 and 10"],
			max: [10, "Rating must be between 1 and 10"],
		},
		director: {
			type: String,
			required: true,
			minlength: [3, "Director's name must be at least 3 characters long"],
		},
		actors: {
			type: [String],
			required: true,
			minlength: [1, "At least one actors must be listed"],
			maxlength: [20, "No more than twenty actors can be listed"],
		},
		posterUrl: {
			type: String,
			required: true,
			validate: {
				validator: function (value) {
					return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
						value
					);
				},
				message: (props) =>
					`${props.value} is an invalid URL! It should start with http:// or https://`,
			},
		},
		state: {
			type: String,
			required: true,
			minlength: [2, "State name must be at least 2 characters long"],
		},
		ageLimit: {
			type: Number,
			required: true,
			min: [0, "Age limit must be a positive integer"],
			max: [18, "Age limit must be less than or equal to 18"],
		},
		additionalInfoId: {
			type: Schema.Types.ObjectId,
			ref: "AdditionalInfo",
			default: null,
		},
	},
	{
		versionKey: false,
	}
);

const movieSchemas = model(`movies`, movieSchema);

export default movieSchemas;
