import { Request, Response, NextFunction } from "express";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.session.uid;
  if (uid) next();
  else res.status(401).json({ msg: "O usuário não está logado" });
};
export default isAuth;
