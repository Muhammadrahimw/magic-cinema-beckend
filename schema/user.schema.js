import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			minlength: [3, "First name must be at least 3 characters long"],
			validate: {
				validator: (value) => /^[a-zA-Z]+$/.test(value),
				message: "First name can only contain alphabetical characters",
			},
		},
		lastName: {
			type: String,
			required: true,
			minlength: [3, "Last name must be at least 3 characters long"],
			validate: {
				validator: (value) => /^[a-zA-Z]+$/.test(value),
				message: "Last name can only contain alphabetical characters",
			},
		},
		email: {
			type: String,
			required: true,
			validate: {
				validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
				message: "Please enter a valid email address",
			},
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: [5, "Password must be at least 5 characters long"],
		},
		orders: [
			{
				id: {type: mongoose.Schema.Types.ObjectId, ref: "session"},
				time: String,
			},
		],
		birthday: {
			type: Date,
			validate: {
				validator: function (value) {
					return /^\d{4}-\d{2}-\d{2}$/.test(value.toISOString().split("T")[0]);
				},
				message: "Please enter a valid date in YYYY-MM-DD format",
			},
		},

		role: {type: String, required: true, enum: ["admin", "user"]},
		isVerified: {type: Boolean, default: false},
		isBlocked: {type: Boolean, default: false},
	},
	{
		versionKey: false,
	}
);

const userSchemas = model("users", userSchema);

export default userSchemas;
