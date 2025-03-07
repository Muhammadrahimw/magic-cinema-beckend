import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const signInJwt = (params, time = `2h`) =>
	jwt.sign(params, process.env.SECRET_KEY, {expiresIn: time});
