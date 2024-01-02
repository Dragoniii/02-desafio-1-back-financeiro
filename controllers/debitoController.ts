import { Response, Request } from "express";
import Debito from "../models/debito";
import { createDbConnection } from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";
import dotenv from "dotenv";

dotenv.config();
const bearer = process.env.BEARER;

let db: Database = createDbConnection();

const debitoRoot = (req: Request, res: Response) => {
    res.send("Página Inicial dos Débitos em Conta Corrente");
}

const addDebito = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

    if (token == "Bearer " + bearer)  {
        let debito: Debito = req.body;

        let sql = `INSERT INTO debito(data, banco, valor) VALUES ("${debito.data}", "${debito.banco}", "${debito.valor}")`;

        if (debito.data && debito.banco && debito.valor) {
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
    } else {
        res.sendStatus(403);
    }
}

const debitoList = (req: Request, res: Response) => {

    let debitoList: Debito[] = [];

    let sql = `SELECT * FROM debito`;

    db.all(sql, [], (error: Error, rows: Debito[]) => {
        if (error) {
            logger.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row: Debito) => { debitoList.push(row) });
        logger.info(req);
        res.send(debitoList);
    }
    );
}

const updateDebito = (req: Request, res: Response) => {
    logger.info(req);
    let debito: Debito = req.body;
    let sql = `UPDATE debito SET data="${debito.data}", 
                                   banco="${debito.banco}", 
                                   valor="${debito.valor}"
                                   WHERE id="${debito.id}"
                                   `;


    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Movimentação atualizada com sucesso.");
    });
}

const deleteDebitoByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `DELETE from debito WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Movimentação deletada com sucesso.");
    })
}

export {
    debitoRoot,
    addDebito,
    debitoList,
    updateDebito,
    deleteDebitoByQuery
};