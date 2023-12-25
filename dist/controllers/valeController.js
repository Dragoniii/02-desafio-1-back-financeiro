"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteValeByQuery = exports.updateVale = exports.valeList = exports.addVale = exports.valeRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
let db = (0, dbConfig_1.createDbConnection)();
const valeRoot = (req, res) => {
    res.send("Página Inicial Vale");
};
exports.valeRoot = valeRoot;
const addVale = (req, res) => {
    logger_1.default.info(req);
    let token = req.headers.authorization;
    if (token == "Bearer 12345") {
        let vale = req.body;
        let sql = `INSERT INTO vale(data, motivo, valor) VALUES ("${vale.data}", "${vale.vale}", "${vale.valor}")`;
        if (vale.data && vale.vale && vale.valor) {
            db.run(sql, (error) => {
                if (error) {
                    res.end(error.message);
                }
                res.send(`Vale Adicionado`);
            });
        }
        else {
            res.send("Erro na criação da Movimentação. Verifique se todos os campos foram preenchidos");
        }
    }
    else {
        res.sendStatus(403);
    }
};
exports.addVale = addVale;
const valeList = (req, res) => {
    let valeList = [];
    let sql = `SELECT * FROM vale`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            logger_1.default.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row) => { valeList.push(row); });
        logger_1.default.info(req);
        res.send(valeList);
    });
};
exports.valeList = valeList;
const updateVale = (req, res) => {
    logger_1.default.info(req);
    let vale = req.body;
    let sql = `UPDATE vale SET data="${vale.data}", 
                                   motivo="${vale.vale}", 
                                   valor="${vale.valor}"
                                   WHERE id="${vale.id}"
                                   `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("SupportIT Updated");
    });
};
exports.updateVale = updateVale;
const deleteValeByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `DELETE from vale WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Vale deletado");
    });
};
exports.deleteValeByQuery = deleteValeByQuery;
