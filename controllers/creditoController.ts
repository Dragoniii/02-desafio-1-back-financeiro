import { Response, Request } from "express";
import Credito from "../models/credito";
import { createDbConnection } from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";
import dotenv from "dotenv";

dotenv.config();
const bearer = process.env.BEARER;

let db: Database = createDbConnection();

const creditoRoot = (req: Request, res: Response) => {
    res.send("Página Inicial dos Cartões de Crédito");
    //res.status(200).json({ mensagem:  "Página Inicial dos Cartões de Crédito2"})
    //res.status(200).json({ token:  "Seu Token é " + bearer})
    //qef
}

const addCredito = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

    if (token == bearer) {
        let credito: Credito = req.body;

        let sql = `INSERT INTO credito(data, banco, parcelado, vista) VALUES ("${credito.data}", "${credito.banco}", "${credito.parcelado}", "${credito.vista}")`;

        if (credito.data && credito.banco && credito.parcelado && credito.vista) {
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

const creditoList = (req: Request, res: Response) => {

    let creditoList: Credito[] = [];

    let sql = `SELECT * FROM credito`;

    db.all(sql, [], (error: Error, rows: Credito[]) => {
        if (error) {
            logger.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row: Credito) => { creditoList.push(row) });
        logger.info(req);
        res.send(creditoList);
    }
    );
}

const updateCredito = (req: Request, res: Response) => {
    logger.info(req);
    let credito: Credito = req.body;
    let sql = `UPDATE credito SET data="${credito.data}",  
                                        banco="${credito.banco}",
                                        parcelado="${credito.parcelado}",
                                        vista="${credito.vista}"
                                        WHERE id="${credito.id}"
                                   `;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Movimentação atualizada com sucesso.");
    });
}

const deleteCreditoByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `DELETE from credito WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Movimentação deletada com sucesso.");
    })
}

export {
    creditoRoot,
    addCredito,
    creditoList,
    updateCredito,
    deleteCreditoByQuery
};