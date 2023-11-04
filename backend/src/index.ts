import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";

import validateEnv from "./utils/validateEnv";
import setLangCookie from "./middlewares/setLangCookie";
import router from "./router";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 7777;

app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    genid: () => uuidv4(),
    secret: "sdfgLSgfm#sme@asdl*asd3S",
    resave: true,
    cookie: { maxAge: 10 * 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
  })
);
app.use(setLangCookie);
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
