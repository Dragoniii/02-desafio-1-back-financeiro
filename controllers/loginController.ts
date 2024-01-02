import { Response, Request, NextFunction } from "express";
import logger from "../services/logger";
import dotenv from "dotenv";

dotenv.config();
const senha = process.env.SENHA;
const usuario = process.env.USUARIO;
const bearer = process.env.BEARER;

const loginRoot = (req: Request, res: Response) => {
    res.send("Página Inicial de Login");
}

const doLogin = (req: Request, res: Response) => {
    logger.info(req);
    let login: any = req.body;

    if (login.senha == senha && login.usuario == usuario){
        res.send("Seu Token é " + bearer);
    }
}

export {
    loginRoot,
    doLogin
};