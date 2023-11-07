import { PrismaClient } from "@prisma/client";
import { TiposUsuarios } from "../src/resources/tipoUsuario/tipoUsuario.constants";

const prisma = new PrismaClient();

async function tipoUsuarioSeeds() {
  await prisma.tipoUsuario.createMany({
    data: [
      { id: TiposUsuarios.ADMIN, rotulo: "admin" },
      { id: TiposUsuarios.CLIENT, rotulo: "client" },
    ],
    skipDuplicates: true,
  });
}

tipoUsuarioSeeds()
  .then(() => {
    console.log("Registros inseridos com sucesso!");
    prisma.$disconnect();
  })
  .catch((err) => {
    prisma.$disconnect();
    console.log(err);
  });
