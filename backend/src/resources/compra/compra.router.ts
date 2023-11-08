import { Router } from "express";
import compraController from "./compra.controller";

const router = Router();

router.post("/:id", compraController.addProdutoCarrinho);
router.post("/", compraController.finalizarCompra);
