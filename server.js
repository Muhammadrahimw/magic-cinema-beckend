import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./db/db.connect.js";
import {router} from "./routes/router.js";
import {CustomError, ResData} from "./utils/res-helpers.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 6060;
app.use(router);

app.get(`/`, (req, res, next) => {
	res.send(`Welcome, you are logged in`);
});

app.use((req, res, next) => {
	try {
		throw new CustomError(404, `${req.url} page not found`);
	} catch (error) {
		next(error);
	}
});

app.use((error, req, res, next) => {
	const statusCode = error.status || 500;
	const resData = new ResData(statusCode, error.message);
	res.status(resData.status).json(resData);
});

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on http://localhost:${PORT}`);
});
