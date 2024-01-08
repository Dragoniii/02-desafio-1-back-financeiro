
import { Database, sqlite3 } from "sqlite3";

const sqlite3 = require("sqlite3").verbose();
const filePath: string = "./db/financeiro.db";

const createDbConnection = () => {
    let db: Database = new sqlite3.Database(filePath, (error: Error) => {
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
}

export { createDbConnection }