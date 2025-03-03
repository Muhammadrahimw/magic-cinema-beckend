import {Router} from "express";
import {
	forgotPassword,
	signIn,
	signUp,
	verifyEmail,
	verifySignIn,
} from "../../controllers/auth.controller.js";
import {
	validateSignIn,
	validateUser,
	validateVerifyEmail,
} from "../../middleware/user.validate.js";
import {verifyQueryToken} from "../../middleware/auth.middleware.js";

const router = Router();

router.post(`/sign-up`, validateUser, signUp);
router.post(`/verify-email`, validateVerifyEmail, verifyEmail);
router.post(`/sign-in`, validateSignIn, signIn);
router.post(`/forgot-password`, forgotPassword);
router.get(`/verify-token`, verifyQueryToken, verifySignIn);

export {router};
