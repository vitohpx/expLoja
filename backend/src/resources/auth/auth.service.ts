import { Usuario, PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcryptjs";

import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";
import { SignupDto, LoginDto } from "./auth.types";
import { findUsuarioByEmail } from "../usuario/usuario.service";

const prisma = new PrismaClient();

export async function createUsuario(usuario: SignupDto): Promise<Usuario> {
  const rounds = parseInt(process.env.SALT_ROUNDS!);
  const salt = await genSalt(rounds);
  const senha = await hash(usuario.senha, salt);
  return await prisma.usuario.create({
    data: {
      ...usuario,
      senha,
      tipoUsuarioId: TiposUsuarios.CLIENT,
    },
  });
}

export async function autenticate(usuario: LoginDto): Promise<Usuario | null> {
  const foundUsuario = await findUsuarioByEmail(usuario.email);
  console.log(foundUsuario);
  if (!foundUsuario) return null;
  const ok = await compare(usuario.senha, foundUsuario.senha);
  if (!ok) return null;
  return foundUsuario;
}
