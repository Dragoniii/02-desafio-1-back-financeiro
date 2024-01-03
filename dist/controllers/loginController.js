"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doLogin = exports.loginRoot = void 0;
const logger_1 = __importDefault(require("../services/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const senha = process.env.SENHA;
const usuario = process.env.USUARIO;
const bearer = process.env.BEARER;
const loginRoot = (req, res) => {
    res.send("Página Inicial de Login");
};
exports.loginRoot = loginRoot;
const doLogin = (req, res) => {
    logger_1.default.info(req);
    let login = req.body;
    if (login.senha == senha && login.usuario == usuario) {
        res.status(200).send(bearer);
    }
    else
        res.status(403).send();
};
exports.doLogin = doLogin;
