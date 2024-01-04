"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCreditoByQuery = exports.updateCredito = exports.creditoList = exports.addCredito = exports.creditoRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bearer = process.env.BEARER;
let db = (0, dbConfig_1.createDbConnection)();
const creditoRoot = (req, res) => {
    res.send("Página Inicial dos Cartões de Crédito");
    //res.status(200).json({ mensagem:  "Página Inicial dos Cartões de Crédito2"})
    //res.status(200).json({ token:  "Seu Token é " + bearer})
    //qef
};
exports.creditoRoot = creditoRoot;
const addCredito = (req, res) => {
    logger_1.default.info(req);
    let token = req.headers.authorization;
    if (token == bearer) {
        let credito = req.body;
        let sql = `INSERT INTO credito(data, banco, parcelado, vista) VALUES ("${credito.data}", "${credito.banco}", "${credito.parcelado}", "${credito.vista}")`;
        if (credito.data && credito.banco && credito.parcelado && credito.vista) {
            db.run(sql, (error) => {
                if (error) {
                    res.end(error.message);
                }
                res.send(`Movimentação adicionada.`);
            });
        }
        else {
            res.send("Erro na criação da movimentação. Verifique se todos os campos foram preenchidos.");
        }
    }
    else {
        res.sendStatus(403);
    }
};
exports.addCredito = addCredito;
const creditoList = (req, res) => {
    let creditoList = [];
    let sql = `SELECT * FROM credito`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            logger_1.default.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row) => { creditoList.push(row); });
        logger_1.default.info(req);
        res.send(creditoList);
    });
};
exports.creditoList = creditoList;
const updateCredito = (req, res) => {
    logger_1.default.info(req);
    let credito = req.body;
    let sql = `UPDATE credito SET data="${credito.data}",  
                                        banco="${credito.banco}",
                                        parcelado="${credito.parcelado}",
                                        vista="${credito.vista}"
                                        WHERE id="${credito.id}"
                                   `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Movimentação atualizada com sucesso.");
    });
};
exports.updateCredito = updateCredito;
const deleteCreditoByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `DELETE from credito WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Movimentação deletada com sucesso.");
    });
};
exports.deleteCreditoByQuery = deleteCreditoByQuery;
