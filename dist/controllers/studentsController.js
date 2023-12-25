"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentByQuery = exports.updateStudent = exports.studentsList = exports.addStudent = exports.studentsRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
let db = (0, dbConfig_1.createDbConnection)();
const studentsRoot = (req, res) => {
    res.send("Página Inicial Students");
};
exports.studentsRoot = studentsRoot;
const addStudent = (req, res) => {
    logger_1.default.info(req);
    let token = req.headers.authorization;
    if (token == "Bearer 12345") {
        let student = req.body;
        let sql = `INSERT INTO students(name, birthday, address, shift, year, room) VALUES ("${student.name}", "${student.birthday}", "${student.address}", "${student.shift}", "${student.year}", "${student.room}")`;
        if (student.name && student.birthday && student.address && student.shift && student.year && student.room) {
            db.run(sql, (error) => {
                if (error) {
                    res.end(error.message);
                }
                res.send(`Student ${student.name} Added`);
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
exports.addStudent = addStudent;
const studentsList = (req, res) => {
    let studentsList = [];
    let sql = `SELECT * FROM students`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            logger_1.default.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row) => { studentsList.push(row); });
        logger_1.default.info(req);
        res.send(studentsList);
    });
};
exports.studentsList = studentsList;
const updateStudent = (req, res) => {
    logger_1.default.info(req);
    let student = req.body;
    let roomToUppercase = student.room.toUpperCase();
    let sql = `UPDATE students SET name="${student.name}", 
                                   shift="${student.shift}", 
                                   year="${student.year}",
                                   room="${roomToUppercase}"
                                   WHERE id="${student.id}"
                                   `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Student Updated");
    });
};
exports.updateStudent = updateStudent;
const deleteStudentByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `DELETE from students WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Student Deleted");
    });
};
exports.deleteStudentByQuery = deleteStudentByQuery;
