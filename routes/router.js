import {Router} from "express";
import {router as authRouter} from "./auth/router.js";
import {router as movieRouter} from "./movie/router.js";
import {router as sessionRouter} from "./session/router.js";
import {router as adminRouter} from "./admin/router.js";

const router = Router();
router.use("/auth", authRouter);
router.use("/movie", movieRouter);
router.use("/session", sessionRouter);
router.use("/admin", adminRouter);

export {router};
