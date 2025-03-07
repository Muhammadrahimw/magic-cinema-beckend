import {Router} from "express";
import {
	deleteSession,
	getSessions,
	getSessionsById,
	postSession,
	putSession,
} from "../../controllers/session.controller.js";
import {validateSession} from "../../middleware/session.middleware.js";
import {verifyAdmin} from "../../middleware/auth.middleware.js";

const router = Router();

router.get(`/`, getSessions);
router.get(`/:id`, getSessionsById);
router.post(`/`, verifyAdmin, validateSession, postSession);
router.put(`/:id`, verifyAdmin, validateSession, putSession);
router.delete(`/:id`, verifyAdmin, deleteSession);

export {router};
