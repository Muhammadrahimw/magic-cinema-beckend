import {totp} from "otplib";
import userSchemas from "../schema/user.schema.js";
import {hashPassword, sendVerifyCode} from "../utils/helpers.js";
import {CustomError, ResData} from "../utils/res-helpers.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res, next) => {
	try {
		const {firstName, lastName, email, password} = req.body;
		const checkUser = await userSchemas.findOne({email});
		if (checkUser) throw new CustomError(400, "Email already exists");
		const newPassword = await hashPassword(password);
		await userSchemas.create({
			firstName,
			lastName,
			email,
			newPassword,
			role: "user",
			isVerified: false,
			isActive: false,
		});
		sendVerifyCode({email, firstName});
		const resData = new ResData(201, {
			message: "Verification code sent to your email",
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const verifyEmail = async (req, res, next) => {
	try {
		const {email, code} = req.body;
		const secret = process.env.SECRET_KEY + email;
		const isValid = totp.check(secret, code);
		if (!isValid) throw new CustomError(400, "Invalid verification code");
		const user = await userSchemas.findOneAndUpdate({
			email,
			isVerified: true,
			isActive: true,
		});
		const resData = new ResData(200, {message: "Email verified successfully"});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};
