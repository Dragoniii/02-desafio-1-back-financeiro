"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbConnection = void 0;
const sqlite3 = require("sqlite3").verbose();
const filePath = "./db/school.db";
const createDbConnection = () => {
    let db = new sqlite3.Database(filePath, (error) => {
        if (error) {
            return console.error(error.message);
        }
    });
    db.exec(`CREATE TABLE IF NOT EXISTS debito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data VARCHAR(50),
        banco VARCHAR(50),
        valor REAL
        );
        `);
    db.exec(`CREATE TABLE IF NOT EXISTS credito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data VARCHAR(50),
        banco VARCHAR(50),
        parcelado REAL,
        vista REAL
        );
        `);
    db.exec(`CREATE TABLE IF NOT EXISTS vale (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data VARCHAR(50),
        vale VARCHAR(50),
        valor REAL
        );
        `);
    db.exec(`CREATE TABLE IF NOT EXISTS dinheiro (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data VARCHAR(50),
        motivo VARCHAR(50),
        valor INTEGER
        );
        `);
    return db;
};
exports.createDbConnection = createDbConnection;
