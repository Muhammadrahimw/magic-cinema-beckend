import {Router} from "express";
import {router as authRouter} from "./auth/router.js";
import {router as movieRouter} from "./movie/router.js";

const router = Router();
router.use("/auth", authRouter);
router.use("/movie", movieRouter);

export {router};
