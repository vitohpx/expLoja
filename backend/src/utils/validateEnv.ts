import { cleanEnv, port, str, num, url } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    SALT_ROUNDS: num(),
    FRONTEND_URL: url(),
  });
}

export default validateEnv;
