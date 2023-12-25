"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDebitoByQuery = exports.updateDebito = exports.debitoList = exports.addDebito = exports.debitoRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
let db = (0, dbConfig_1.createDbConnection)();
const debitoRoot = (req, res) => {
    res.send("Página Inicial Débitos");
};
exports.debitoRoot = debitoRoot;
const addDebito = (req, res) => {
    logger_1.default.info(req);
    let token = req.headers.authorization;
    if (token == "Bearer 12345") {
        let debito = req.body;
        let sql = `INSERT INTO debito(data, banco, valor) VALUES ("${debito.data}", "${debito.banco}", "${debito.valor}")`;
        if (debito.data && debito.banco && debito.valor) {
            db.run(sql, (error) => {
                if (error) {
                    res.end(error.message);
                }
                res.send(`Débito adicionado`);
            });
        }
        else {
            res.send("Erro na criação do Débito. Verifique se todos os campos foram preenchidos");
        }
    }
    else {
        res.sendStatus(403);
    }
};
exports.addDebito = addDebito;
const debitoList = (req, res) => {
    let debitoList = [];
    let sql = `SELECT * FROM debito`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            logger_1.default.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row) => { debitoList.push(row); });
        logger_1.default.info(req);
        res.send(debitoList);
    });
};
exports.debitoList = debitoList;
const updateDebito = (req, res) => {
    logger_1.default.info(req);
    let debito = req.body;
    let sql = `UPDATE debito SET name="${debito.data}", 
                                   shift="${debito.banco}", 
                                   year="${debito.valor}"
                                   WHERE id="${debito.id}"
                                   `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Débito atualizado");
    });
};
exports.updateDebito = updateDebito;
const deleteDebitoByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `DELETE from debito WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Débito deletado");
    });
};
exports.deleteDebitoByQuery = deleteDebitoByQuery;
