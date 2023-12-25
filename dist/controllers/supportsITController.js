"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSupportITByQuery = exports.updateSupportIT = exports.supportsITList = exports.addSupportIT = exports.supportsITRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
let db = (0, dbConfig_1.createDbConnection)();
const supportsITRoot = (req, res) => {
    res.send("Página Inicial SupportsIT");
};
exports.supportsITRoot = supportsITRoot;
const addSupportIT = (req, res) => {
    logger_1.default.info(req);
    let token = req.headers.authorization;
    if (token == "Bearer 12345") {
        let supportIT = req.body;
        let sql = `INSERT INTO supportsIT(name, birthday, address, type, company, settle) VALUES ("${supportIT.name}", "${supportIT.birthday}", "${supportIT.address}", "${supportIT.type}", "${supportIT.company}", "${supportIT.settle}")`;
        if (supportIT.name && supportIT.birthday && supportIT.address && supportIT.type && supportIT.company && supportIT.settle) {
            db.run(sql, (error) => {
                if (error) {
                    res.end(error.message);
                }
                res.send(`SupportIT ${supportIT.name} Added`);
            });
        }
        else {
            res.send("Erro na criação do estudante. Verifique se todos os campos foram preenchidos");
        }
    }
    else {
        res.sendStatus(403);
    }
};
exports.addSupportIT = addSupportIT;
const supportsITList = (req, res) => {
    let supportsITList = [];
    let sql = `SELECT * FROM supportsIT`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            logger_1.default.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row) => { supportsITList.push(row); });
        logger_1.default.info(req);
        res.send(supportsITList);
    });
};
exports.supportsITList = supportsITList;
const updateSupportIT = (req, res) => {
    logger_1.default.info(req);
    let supportIT = req.body;
    let sql = `UPDATE supportsIT SET name="${supportIT.name}", 
                                   birthday="${supportIT.birthday}", 
                                   address="${supportIT.address}",
                                   type="${supportIT.type}", 
                                   company="${supportIT.company}",
                                   settle="${supportIT.settle}"
                                   WHERE id="${supportIT.id}"
                                   `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("SupportIT Updated");
    });
};
exports.updateSupportIT = updateSupportIT;
const deleteSupportITByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `DELETE from supportsIT WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("SupportIT Deleted");
    });
};
exports.deleteSupportITByQuery = deleteSupportITByQuery;
