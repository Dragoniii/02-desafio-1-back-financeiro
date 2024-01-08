"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbConnection = void 0;
const sqlite3 = require("sqlite3").verbose();
const filePath = "./db/financeiro.db";
const createDbConnection = () => {
    let db = new sqlite3.Database(filePath, (error) => {
        if (error) {
            return console.error(error.message);
        }
    });
    db.exec(`CREATE TABLE IF NOT EXISTS debito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data VARCHAR(30),
        banco VARCHAR(30),
        valor REAL
        );
        `);
    db.exec(`CREATE TABLE IF NOT EXISTS credito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data VARCHAR(30),
        banco VARCHAR(30),
        parcelado REAL,
        vista REAL
        );
        `);
    db.exec(`CREATE TABLE IF NOT EXISTS vale (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data VARCHAR(30),
        vale VARCHAR(30),
        valor REAL
        );
        `);
    db.exec(`CREATE TABLE IF NOT EXISTS dinheiro (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data VARCHAR(30),
        motivo VARCHAR(30),
        valor INTEGER
        );
        `);
    db.exec(`CREATE TABLE IF NOT EXISTS justificativa (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fonte VARCHAR(30),
        diagnostico VARCHAR(300),
        resolucao VARCHAR(300)
        );
        `);
    return db;
};
exports.createDbConnection = createDbConnection;
