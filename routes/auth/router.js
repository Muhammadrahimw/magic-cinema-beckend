import {Router} from "express";
import {
	changeEmail,
	changeInfo,
	changePassword,
	createUserOrder,
	forgotPassword,
	getUserOrders,
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
router.post(`/create-order`, verifyToken, createUserOrder);
router.get(`/get-order`, verifyToken, getUserOrders);

export {router};
