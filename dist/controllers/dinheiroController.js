"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDinheiroByQuery = exports.updateDinheiro = exports.dinheiroList = exports.addDinheiro = exports.dinheiroRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bearer = process.env.BEARER;
let db = (0, dbConfig_1.createDbConnection)();
const dinheiroRoot = (req, res) => {
    res.send("Página Inicial das Movimetações em Dinheiro");
};
exports.dinheiroRoot = dinheiroRoot;
const addDinheiro = (req, res) => {
    logger_1.default.info(req);
    let token = req.headers.authorization;
    if (token == bearer) {
        let dinheiro = req.body;
        let sql = `INSERT INTO dinheiro(data, motivo, valor) VALUES ("${dinheiro.data}", "${dinheiro.motivo}", "${dinheiro.valor}")`;
        if (dinheiro.data && dinheiro.motivo && dinheiro.valor) {
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
exports.addDinheiro = addDinheiro;
const dinheiroList = (req, res) => {
    let dinheiroList = [];
    let sql = `SELECT * FROM dinheiro`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            logger_1.default.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row) => { dinheiroList.push(row); });
        logger_1.default.info(req);
        res.send(dinheiroList);
    });
};
exports.dinheiroList = dinheiroList;
const updateDinheiro = (req, res) => {
    logger_1.default.info(req);
    let dinheiro = req.body;
    let sql = `UPDATE dinheiro SET data="${dinheiro.data}", 
                                   motivo="${dinheiro.motivo}", 
                                   valor="${dinheiro.valor}"
                                   WHERE id="${dinheiro.id}"
                                   `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Movimentação atualizada com sucesso.");
    });
};
exports.updateDinheiro = updateDinheiro;
const deleteDinheiroByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `DELETE from dinheiro WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Movimentação deletada com sucesso.");
    });
};
exports.deleteDinheiroByQuery = deleteDinheiroByQuery;
