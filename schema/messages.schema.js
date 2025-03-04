import {Schema, model} from "mongoose";

const messagesSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		content: {
			type: String,
			required: true,
			minlength: [3, "Message must be at least 3 characters long"],
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	}
);

const messagesSchemas = model("messages", messagesSchema);

export default messagesSchemas;
