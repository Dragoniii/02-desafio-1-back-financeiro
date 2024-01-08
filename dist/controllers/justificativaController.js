"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJustificativaByQuery = exports.updateJustificativa = exports.justificativaList = exports.addJustificativa = exports.justificativaRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bearer = process.env.BEARER;
let db = (0, dbConfig_1.createDbConnection)();
const justificativaRoot = (req, res) => {
    res.send("Página Inicial das Justificativas");
};
exports.justificativaRoot = justificativaRoot;
const addJustificativa = (req, res) => {
    logger_1.default.info(req);
    let token = req.headers.authorization;
    if (token == bearer) {
        let justificativa = req.body;
        let sql = `INSERT INTO justificativa(fonte, diagnostico, resolucao) VALUES ("${justificativa.fonte}", "${justificativa.diagnostico}", "${justificativa.resolucao}")`;
        if (justificativa.fonte && justificativa.diagnostico && justificativa.resolucao) {
            db.run(sql, (error) => {
                if (error) {
                    res.end(error.message);
                }
                res.send(`Justificativa adicionada.`);
            });
        }
        else {
            res.send("Erro na criação da justificativa. Verifique se todos os campos foram preenchidos corretamente.");
        }
    }
    else {
        res.sendStatus(403);
    }
};
exports.addJustificativa = addJustificativa;
const justificativaList = (req, res) => {
    let token = req.headers.authorization;
    if (token == bearer) {
        let justificativaList = [];
        let sql = `SELECT * FROM justificativa`;
        db.all(sql, [], (error, rows) => {
            if (error) {
                logger_1.default.error(error.message);
                res.send(error.message);
            }
            rows.forEach((row) => { justificativaList.push(row); });
            logger_1.default.info(req);
            res.send(justificativaList);
        });
    }
    else {
        res.sendStatus(403);
    }
};
exports.justificativaList = justificativaList;
const updateJustificativa = (req, res) => {
    let token = req.headers.authorization;
    if (token == bearer) {
        logger_1.default.info(req);
        let justificativa = req.body;
        let sql = `UPDATE justificativa SET fonte="${justificativa.fonte}", 
                                            diagnostico="${justificativa.diagnostico}", 
                                            resolucao="${justificativa.resolucao}"
                                   WHERE id="${justificativa.id}"
                                   `;
        if (justificativa.fonte && justificativa.diagnostico && justificativa.resolucao) {
            db.all(sql, [], (error) => {
                if (error) {
                    res.send(error.message);
                }
                res.send("Justificativa atualizada com sucesso.");
            });
        }
        else {
            res.send("Erro na atualização da justificativa. Verifique se todos os campos foram preenchidos corretamente.");
        }
    }
    else {
        res.sendStatus(403);
    }
};
exports.updateJustificativa = updateJustificativa;
const deleteJustificativaByQuery = (req, res) => {
    let token = req.headers.authorization;
    if (token == bearer) {
        logger_1.default.info(req);
        let id = req.query.id;
        let sql = `DELETE from justificativa WHERE id="${id}"`;
        db.all(sql, [], (error) => {
            if (error) {
                res.send(error.message);
            }
            res.send("Justificativa deletada com sucesso.");
        });
    }
    else {
        res.sendStatus(403);
    }
};
exports.deleteJustificativaByQuery = deleteJustificativaByQuery;
