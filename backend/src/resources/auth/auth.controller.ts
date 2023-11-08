import { Request, Response } from "express";
import { findUsuarioByEmail } from "../usuario/usuario.service";
import { createUsuario, autenticate } from "./auth.service";

async function signup(req: Request, res: Response) {
  try {
    if (await findUsuarioByEmail(req.body.email))
      return res
        .status(409)
        .json({ msg: "Já existe um usuário com o email informado" });
    const usuario = await createUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  try {
    const usuario = await autenticate({ email, senha });
    if (!usuario)
      return res.status(401).json({
        msg: "Email e/ou senha incorretos",
      });
    req.session.uid = usuario.id;
    req.session.tipoUsuario = usuario.tipoUsuarioId;
    res.status(200).json({ msg: "Usuário autenticado" });
  } catch (e) {
    res.status(500).json(e);
  }
};

async function logout(req: Request, res: Response) {
  req.session.destroy((error) => {
    if (error) return res.status(500).json({ msg: "Erro ao efetuar o logout" });
    res.status(200).json({ msg: "Usuário deslogado com sucesso" });
  });
}

export default { signup, login, logout };
