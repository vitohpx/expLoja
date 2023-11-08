import { Router } from "express";
import isAuth from "../../middlewares/isAuth";
import authController from "./auth.controller";

const router = Router();

router.post("/", authController.signup);
router.put("/", authController.login);
router.delete("/", isAuth, authController.logout);

export default router;
