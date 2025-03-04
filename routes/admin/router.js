import {Router} from "express";
import {
	editUser,
	getUserMessages,
	getUsers,
	postManyMovies,
	sendUserMessage,
} from "../../controllers/admin.controller.js";
import {verifyAdmin, verifyToken} from "../../middleware/auth.middleware.js";

const router = Router();

router.get(`/get-users`, verifyAdmin, getUsers);
router.get(`/get-sms`, verifyAdmin, getUserMessages);
router.post(`/send-sms`, verifyToken, sendUserMessage);
router.put(`/edit-user/:id`, verifyAdmin, editUser);
router.post(`/many-movies`, verifyAdmin, postManyMovies);

export {router};
