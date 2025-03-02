import {Schema, model} from "mongoose";

const userSchema = new Schema({
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
	orders: {
		type: [{type: Schema.Types.ObjectId, ref: "orders"}],
		default: [],
	},
	birthday: {
		type: Date,
		validate: [
			{
				validator: (value) => !isNaN(new Date(value).getTime()),
				message: "Please enter a valid date",
			},
		],
	},
	role: {type: String, required: true, enum: ["admin", "user"]},
	isVerified: {type: Boolean, default: false},
	isActive: {type: Boolean, default: true},
});

const userSchemas = model("users", userSchema);

export default userSchemas;
