import {Router} from "express";
import {router as authRouter} from "./auth/router.js";

const router = Router();
router.use("/auth", authRouter);

export {router};
