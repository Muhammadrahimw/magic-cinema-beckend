import {Schema, model} from "mongoose";

const sessionSchema = new Schema(
	{
		time: {
			type: Date,
			required: true,
			get: (v) => v.toISOString().slice(0, 16).replace("T", " "),
		},
		price: {
			type: Number,
			required: true,
		},
		places: {
			type: Number,
			required: true,
			min: [1, "At least 1 seat must be available"],
			max: [20, "Cannot have more than 20 seats"],
			default: 20,
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
