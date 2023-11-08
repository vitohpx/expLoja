import { Request, Response, NextFunction } from "express";
import { registrarCompra } from "./compra.service";

function addProdutoCarrinho(req: Request, res: Response) {
  const { id } = req.params;
  if (!req.session.carrinhoCompras) req.session.carrinhoCompras = [];
  req.session.carrinhoCompras.push(id);
  res.status(201).json({ msg: "Item adicionado ao carrinho" });
}
function finalizarCompra(req: Request, res: Response) {
  if (!req.session.uid)
    return res.status(400).json({ msg: "Usuário não logado" });
  if (!req.session.carrinhoCompras)
    return res.status(400).json({ msg: "Carrinho vazio" });
  try {
    await registrarCompra(req.session.carrinhoCompras);
  } catch (error) {
    res.status(500).json(error);
  }
}

export default { addProdutoCarrinho, finalizarCompra };
