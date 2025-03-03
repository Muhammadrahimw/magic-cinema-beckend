import {totp} from "otplib";
import userSchemas from "../schema/user.schema.js";
import {
	hashPassword,
	sendVerifyLink,
	sendVerifyCode,
	sendPasswordInfo,
	sendChangeEmailInfo,
	sendChangeEmailLink,
} from "../utils/helpers.js";
import {CustomError, ResData} from "../utils/res-helpers.js";
import bcrypt from "bcrypt";
import {signInJwt} from "../utils/jwt.js";

export const signUp = async (req, res, next) => {
	try {
		const {firstName, lastName, email, password} = req.body;
		const checkUser = await userSchemas.findOne({email});
		if (!checkUser) {
			const newPassword = await hashPassword(password);
			await userSchemas.create({
				firstName,
				lastName,
				email,
				password: newPassword,
				role: "user",
				isVerified: false,
				isBlocked: false,
			});
		} else if (checkUser.isVerified)
			throw new CustomError(400, "Email already exists");

		await sendVerifyCode({email, firstName});
		const resData = new ResData(201, "Verification code sent to your email");
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const verifyEmail = async (req, res, next) => {
	try {
		const {email, code} = req.body;
		const secret = process.env.SECRET_KEY + email;
		const isValid = totp.check(code, secret);

		if (!isValid) throw new CustomError(400, "Invalid verification code");
		const user = await userSchemas.findOneAndUpdate(
			{email},
			{isVerified: true}
		);
		if (!user) return next(new CustomError(404, "User not found"));

		const token = signInJwt({id: user._id, role: user.role});
		const resData = new ResData(201, "Email verified successfully", {
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			orders: user.orders,
			role: user.role,
			token: token,
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const signIn = async (req, res, next) => {
	try {
		const {email, password} = req.body;
		const user = await userSchemas.findOne({email});

		if (!user) throw new CustomError(404, "User not found");
		if (user.isBlocked)
			throw new CustomError(
				403,
				"Your account has been blocked. Please contact support for more information"
			);
		if (!user.isVerified) {
			await sendVerifyCode({email, firstName: user.firstName});
			throw new CustomError(
				403,
				"Your email is not verified. Check your email for the verification code"
			);
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new CustomError(401, "Invalid email or password");

		const token = signInJwt({id: user._id, role: user.role});
		const resData = new ResData(200, "You successfully signed in", {
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			orders: user.orders,
			role: user.role,
			token: token,
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const forgotPassword = async (req, res, next) => {
	try {
		const {email} = req.body;
		if (!email) throw new CustomError(401, `Email is required`);
		const user = await userSchemas.findOne({email});
		if (!user) throw new CustomError(404, "User not found");
		if (user.isBlocked)
			throw new CustomError(
				403,
				"Your account has been blocked. Please contact support for more information"
			);
		if (!user.isVerified) {
			await sendVerifyCode({email, firstName: user.firstName});
			throw new CustomError(
				403,
				"Your email is not verified. Check your email for the verification code"
			);
		}
		const token = signInJwt({id: user._id, user: user.role}, `5m`);
		sendVerifyLink({name: user.firstName, email, token});
		const resData = new ResData(200, "Verify link sent to your email");
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const verifySignIn = async (req, res, next) => {
	try {
		const userId = req.userId;
		const user = await userSchemas.findOne({_id: userId});
		if (!user) throw new CustomError(404, "User not found");

		const token = signInJwt({id: userId, role: user.role});
		const resData = new ResData(200, "You successfully signed in", {
			_id: userId,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			orders: user.orders,
			role: user.role,
			token,
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const changeInfo = async (req, res, next) => {
	try {
		const {firstName, lastName, birthday} = req.body;
		const userId = req.userId;
		if (!firstName && !lastName && !birthday)
			throw new CustomError(400, `At least one field is required`);

		const user = await userSchemas.findByIdAndUpdate(
			userId,
			{
				...(firstName && {firstName}),
				...(lastName && {lastName}),
				...(birthday && {birthday}),
			},
			{new: true}
		);

		const resData = new ResData(200, "Information updated successfully", {
			_id: userId,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			orders: user.orders,
			role: user.role,
			birthday: user.birthday,
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const changePassword = async (req, res, next) => {
	try {
		const userId = req.userId;
		const {oldPassword, newPassword} = req.body;
		const user = await userSchemas.findOne({_id: userId});
		if (!user) throw new CustomError(404, "User not found");

		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) throw new CustomError(401, "Password is incorrect");

		if (oldPassword === newPassword)
			throw new CustomError(
				400,
				"New password cannot be the same as the old password"
			);
		const newPasswordHash = await hashPassword(newPassword);

		await userSchemas.findByIdAndUpdate(userId, {
			password: newPasswordHash,
		});
		await sendPasswordInfo({email: user.email, name: user.firstName});

		const resData = new ResData(200, "Password changed successfully");
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const changeEmail = async (req, res, next) => {
	try {
		const {newEmail} = req.body;
		const userId = req.userId;
		if (!newEmail) throw new CustomError(400, "New email is required");

		const existingUser = await userSchemas.findOne({email: newEmail});
		if (existingUser) throw new CustomError(400, "Email is already in use");

		const user = await userSchemas.findOne({_id: userId});
		const token = signInJwt(
			{id: user._id, user: user.role, email: newEmail},
			`5m`
		);
		await sendChangeEmailLink({name: user.firstName, email: newEmail, token});

		const resData = new ResData(200, "Verify link sent to your email");
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const verifyChangeEmail = async (req, res, next) => {
	try {
		const userId = req.userId;
		const userEmail = req.userEmail;

		if (!userEmail) throw new CustomError(404, "User not found");

		const user = await userSchemas.findOneAndUpdate(
			{_id: userId},
			{email: userEmail}
		);

		await sendChangeEmailInfo({
			name: user.firstName,
			email: user.email,
		});

		const resData = new ResData(200, "Email changed successfully");
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};
