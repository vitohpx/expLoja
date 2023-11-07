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

async function login(req: Request, res: Response) {
  try {
    const usuario = await autenticate(req.body);
    if (!usuario)
      return res.status(401).json({ msg: "Email e/ou senha incorretos" });
    console.log(usuario);
    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function logout(req: Request, res: Response) {}

export default { signup, login, logout };
