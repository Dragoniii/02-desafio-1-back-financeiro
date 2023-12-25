import { Response, Request } from "express";
import Debito from "../models/debito";
import { createDbConnection } from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";


let db: Database = createDbConnection();

const debitoRoot = (req: Request, res: Response) => {
    res.send("Página Inicial Débitos");
}

const addDebito = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

    if (token == "Bearer 12345") {
        let debito: Debito = req.body;

        let sql = `INSERT INTO debito(data, banco, valor) VALUES ("${debito.data}", "${debito.banco}", "${debito.valor}")`;

        if (debito.data && debito.banco && debito.valor) {
            db.run(sql,
                (error: Error) => {
                    if (error) {
                        res.end(error.message);
                    }
                    res.send(`Débito adicionado`);
                })
        } else {
            res.send("Erro na criação do Débito. Verifique se todos os campos foram preenchidos");
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
    let sql = `UPDATE debito SET name="${debito.data}", 
                                   shift="${debito.banco}", 
                                   year="${debito.valor}"
                                   WHERE id="${debito.id}"
                                   `;


    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Débito atualizado");
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
        res.send("Débito deletado");
    })
}





export {
    debitoRoot,
    addDebito,
    debitoList,
    updateDebito,
    deleteDebitoByQuery
};