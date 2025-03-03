import {Router} from "express";
import {
	changeEmail,
	changeInfo,
	changePassword,
	forgotPassword,
	signIn,
	signUp,
	verifyChangeEmail,
	verifyEmail,
	verifySignIn,
} from "../../controllers/auth.controller.js";
import {
	validateSignIn,
	validateUpdatePassword,
	validateUser,
	validateVerifyEmail,
} from "../../middleware/user.validate.js";
import {
	verifyQueryToken,
	verifyToken,
} from "../../middleware/auth.middleware.js";

const router = Router();

router.post(`/sign-up`, validateUser, signUp);
router.post(`/verify-email`, validateVerifyEmail, verifyEmail);
router.post(`/sign-in`, validateSignIn, signIn);
router.post(`/forgot-password`, forgotPassword);
router.get(`/verify-token`, verifyQueryToken, verifySignIn);
router.put(`/change-info`, verifyToken, changeInfo);
router.put(
	`/change-password`,
	verifyToken,
	validateUpdatePassword,
	changePassword
);
router.post(`/change-email`, verifyToken, changeEmail);
router.get(`/change-email-token`, verifyQueryToken, verifyChangeEmail);

export {router};
