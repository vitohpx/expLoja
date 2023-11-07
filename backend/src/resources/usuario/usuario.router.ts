import { Router } from "express";
import usuarioController from "./usuario.controller";
import { usuarioSchema } from "./usuario.schemas";
import validate from "../../middlewares/validate";

const router = Router();

router.get("/", usuarioController.index);
router.post("/", validate(usuarioSchema), usuarioController.create);
router.get("/:id", usuarioController.read);
router.put("/:id", validate(usuarioSchema), usuarioController.update);
router.delete("/:id", usuarioController.remove);

export default router;
