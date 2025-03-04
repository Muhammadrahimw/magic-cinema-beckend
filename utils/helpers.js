import bcrypt from "bcrypt";
import {totp} from "otplib";
import {transporter} from "../config/mailer.js";
import {
	verifyLinkDesign,
	verifyCodeDesign,
	updatedPasswordDesign,
	verifyChangeEmailDesign,
} from "./verify-designs.js";
import multer from "multer";

totp.options = {
	step: 120,
};

export const hashPassword = async (password) => await bcrypt.hash(password, 10);

export const sendVerifyCode = async ({email, firstName}) => {
	const secret = process.env.SECRET_KEY + email;
	const otpcode = totp.generate(secret);
	await transporter.sendMail({
		from: process.env.MAIL_AUTH_NAME,
		to: email,
		subject: "Register code",
		html: verifyCodeDesign(otpcode, firstName),
	});
};

export const sendVerifyLink = async ({name, email, token}) => {
	await transporter.sendMail({
		from: process.env.MAIL_AUTH_NAME,
		to: email,
		subject: "Login link",
		html: verifyLinkDesign(
			`${process.env.FRONTEND_URL}/auth/verify-token/?token=${token}`,
			name
		),
	});
};

export const sendPasswordInfo = async ({name, email}) => {
	await transporter.sendMail({
		from: process.env.MAIL_AUTH_NAME,
		to: email,
		subject: "Password changed",
		html: updatedPasswordDesign(name),
	});
};

export const sendChangeEmailInfo = async ({name, email}) => {
	await transporter.sendMail({
		from: process.env.MAIL_AUTH_NAME,
		to: email,
		subject: "Email changed",
		html: updatedPasswordDesign(name),
	});
};

export const sendChangeEmailLink = async ({name, email, token}) => {
	await transporter.sendMail({
		from: process.env.MAIL_AUTH_NAME,
		to: email,
		subject: "Change email link",
		html: verifyChangeEmailDesign(
			`${process.env.FRONTEND_URL}/auth/change-email-token/?token=${token}`,
			name
		),
	});
};

const storage = multer.diskStorage({});
export const upload = multer({storage});
