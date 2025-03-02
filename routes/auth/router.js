import {Router} from "express";
import {signUp} from "../../controllers/auth.controller.js";
import {validateUser} from "../../middleware/user.validate.js";

const router = Router();

router.post(`/sign-up`, validateUser, signUp);

export {router};
