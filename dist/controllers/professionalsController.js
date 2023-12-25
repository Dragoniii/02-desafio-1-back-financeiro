"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfessionalByQuery = exports.updateProfessional = exports.professionalsList = exports.addProfessional = exports.professionalsRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
let db = (0, dbConfig_1.createDbConnection)();
const professionalsRoot = (req, res) => {
    res.send("Página Inicial Professionals");
};
exports.professionalsRoot = professionalsRoot;
const addProfessional = (req, res) => {
    logger_1.default.info(req);
    let token = req.headers.authorization;
    if (token == "Bearer 12345") {
        let professional = req.body;
        let sql = `INSERT INTO professionals(name, birthday, address, role, shift, sector) VALUES ("${professional.name}", "${professional.birthday}", "${professional.address}", "${professional.role}", "${professional.shift}", "${professional.sector}")`;
        if (professional.name && professional.birthday && professional.address && professional.role && professional.shift && professional.sector) {
            db.run(sql, (error) => {
                if (error) {
                    res.end(error.message);
                }
                res.send(`Professional ${professional.name} Added`);
            });
        }
        else {
            res.send("Erro na criação do profissional. Verifique se todos os campos foram preenchidos");
        }
    }
    else {
        res.sendStatus(403);
    }
};
exports.addProfessional = addProfessional;
const professionalsList = (req, res) => {
    let professionalsList = [];
    let sql = `SELECT * FROM professionals`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            logger_1.default.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row) => { professionalsList.push(row); });
        logger_1.default.info(req);
        res.send(professionalsList);
    });
};
exports.professionalsList = professionalsList;
const updateProfessional = (req, res) => {
    logger_1.default.info(req);
    let professional = req.body;
    let sql = `UPDATE professionals SET name="${professional.name}",  
                                   birthday="${professional.birthday}",
                                   address="${professional.address}"
                                   role="${professional.role}"
                                   shift="${professional.shift}"
                                   sector="${professional.sector}",
                                   WHERE id="${professional.id}"
                                   `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Professional Updated");
    });
};
exports.updateProfessional = updateProfessional;
const deleteProfessionalByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `DELETE from professionals WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Professional Deleted");
    });
};
exports.deleteProfessionalByQuery = deleteProfessionalByQuery;
