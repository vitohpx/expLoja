import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();
const doc = {
  info: {
    title: "API da Loja virtual",
    description: "Documentação da API",
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
};
const outputFile = `${__dirname}/swagger-doc.json`;
const routes = [`${__dirname}/router/index.ts`];
swaggerAutogen()(outputFile, routes, doc);
