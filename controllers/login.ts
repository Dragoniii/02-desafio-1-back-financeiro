import { Response, Request, NextFunction } from "express";
import Vale from "../models/vale";
import { createDbConnection } from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";

let db: Database = createDbConnection();

const addVale = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

        let sql = `INSERT INTO vale(data, vale, valor) VALUES ("${vale.data}", "${vale.vale}", "${vale.valor}")`;

        if (vale.data && vale.vale && vale.valor) {
            db.run(sql,
                (error: Error) => {
                    if (error) {
                        res.end(error.message);
                    }
                    res.send(`Movimentação adicionada.`);
                })
        } else {
            res.send("Erro na criação da movimentação. Verifique se todos os campos foram preenchidos.");
        }

    }

export {
    addVale,
};