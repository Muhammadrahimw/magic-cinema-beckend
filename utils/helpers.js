import bcrypt from "bcrypt";
import {totp} from "otplib";
import {transporter} from "../config/mailer.js";
import {verifyCodeDesign} from "./verify-designs.js";

export const hashPassword = async (password) => {
	return await bcrypt.hash(password, 10);
};

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
