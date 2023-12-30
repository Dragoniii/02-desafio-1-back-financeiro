import { Response, Request, NextFunction } from "express";
import Dinheiro from "../models/dinheiro";
import { createDbConnection } from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";

let db: Database = createDbConnection();

const dinheiroRoot = (req: Request, res: Response) => {
    res.send("Página Inicial das Movimetações em Dinheiro");
}

const addDinheiro = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

    if (token == "Bearer 12345") {
        let dinheiro: Dinheiro = req.body;

        let sql = `INSERT INTO dinheiro(data, motivo, valor) VALUES ("${dinheiro.data}", "${dinheiro.motivo}", "${dinheiro.valor}")`;

        if (dinheiro.data && dinheiro.motivo && dinheiro.valor) {
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

const dinheiroList = (req: Request, res: Response) => {

    let dinheiroList: Dinheiro[] = [];

    let sql = `SELECT * FROM dinheiro`;

    db.all(sql, [], (error: Error, rows: Dinheiro[]) => {
        if (error) {
            logger.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row: Dinheiro) => { dinheiroList.push(row) });
        logger.info(req);
        res.send(dinheiroList);
    }
    );
}

const updateDinheiro = (req: Request, res: Response) => {
    logger.info(req);
    let dinheiro: Dinheiro = req.body;
    let sql = `UPDATE dinheiro SET data="${dinheiro.data}", 
                                   motivo="${dinheiro.motivo}", 
                                   valor="${dinheiro.valor}"
                                   WHERE id="${dinheiro.id}"
                                   `;


    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Movimentação atualizada com sucesso.");
    });
}

const deleteDinheiroByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `DELETE from dinheiro WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Movimentação deletada com sucesso.");
    })
}

export {
    dinheiroRoot,
    addDinheiro,
    dinheiroList,
    updateDinheiro,
    deleteDinheiroByQuery
};