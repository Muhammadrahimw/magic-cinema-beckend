import {Schema, model} from "mongoose";

const sessionSchema = new Schema(
	{
		date: {
			type: String,
			enum: ["today", "tomorrow"],
			required: true,
		},
		time: {
			type: [String],
			required: true,
			validate: {
				validator: function (times) {
					return (
						Array.isArray(times) &&
						times.length > 0 &&
						times.length <= 3 &&
						times.every((v) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v))
					);
				},
				message: (props) =>
					`${props.value} is not a valid time array! Allowed format: ["HH:mm", "HH:mm"]`,
			},
		},
		price: {
			type: Number,
			required: true,
		},
		places: {
			type: [Number],
			required: true,
			validate: {
				validator: function (v) {
					return (
						Array.isArray(v) &&
						v.length > 0 &&
						v.length <= 3 &&
						v.every((num) => num >= 1 && num <= 20)
					);
				},
				message:
					"Places array must have 1 to 3 elements, and each must be between 1 and 20!",
			},
		},
		movieId: {
			type: Schema.Types.ObjectId,
			ref: "movies",
			required: true,
		},
	},
	{
		versionKey: false,
	}
);

const sessionSchemas = model("sessions", sessionSchema);

export default sessionSchemas;
