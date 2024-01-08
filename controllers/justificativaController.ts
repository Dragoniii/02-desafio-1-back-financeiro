import { Response, Request, NextFunction } from "express";
import Justificativa from "../models/justificativa";
import { createDbConnection } from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";
import dotenv from "dotenv";

dotenv.config();
const bearer = process.env.BEARER;

let db: Database = createDbConnection();

const justificativaRoot = (req: Request, res: Response) => {
    res.send("Página Inicial das Justificativas");
}

const addJustificativa = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;
    if (token == bearer) {
        let justificativa: Justificativa = req.body;

        let sql = `INSERT INTO justificativa(fonte, diagnostico, resolucao) VALUES ("${justificativa.fonte}", "${justificativa.diagnostico}", "${justificativa.resolucao}")`;

        if (justificativa.fonte && justificativa.diagnostico && justificativa.resolucao) {
            db.run(sql,
                (error: Error) => {
                    if (error) {
                        res.end(error.message);
                    }
                    res.send(`Justificativa adicionada.`);
                })
        } else {
            res.send("Erro na criação da justificativa. Verifique se todos os campos foram preenchidos corretamente.");
        }
    } else {
        res.sendStatus(403);
    }
}

const justificativaList = (req: Request, res: Response) => {
    let token = req.headers.authorization;
    if (token == bearer) {
        let justificativaList: Justificativa[] = [];

        let sql = `SELECT * FROM justificativa`;

        db.all(sql, [], (error: Error, rows: Justificativa[]) => {
            if (error) {
                logger.error(error.message);
                res.send(error.message);
            }
            rows.forEach((row: Justificativa) => { justificativaList.push(row) });
            logger.info(req);
            res.send(justificativaList);
        }
        );
    } else {
        res.sendStatus(403);
    }
}

const updateJustificativa = (req: Request, res: Response) => {
    let token = req.headers.authorization;
    if (token == bearer) {
        logger.info(req);
        let justificativa: Justificativa = req.body;
        let sql = `UPDATE justificativa SET fonte="${justificativa.fonte}", 
                                            diagnostico="${justificativa.diagnostico}", 
                                            resolucao="${justificativa.resolucao}"
                                   WHERE id="${justificativa.id}"
                                   `;

        if (justificativa.fonte && justificativa.diagnostico && justificativa.resolucao) {
            db.all(sql, [], (error: Error) => {
                if (error) {
                    res.send(error.message);
                }
                res.send("Justificativa atualizada com sucesso.");
            });
        } else {
            res.send("Erro na atualização da justificativa. Verifique se todos os campos foram preenchidos corretamente.");
        }
    } else {
        res.sendStatus(403);
    }
}

const deleteJustificativaByQuery = (req: Request, res: Response) => {
    let token = req.headers.authorization;
    if (token == bearer) {
        logger.info(req);
        let id = req.query.id;
        let sql = `DELETE from justificativa WHERE id="${id}"`;

        db.all(sql, [], (error: Error) => {
            if (error) {
                res.send(error.message);
            }
            res.send("Justificativa deletada com sucesso.");
        })
    } else {
        res.sendStatus(403);
    }
}

export {
    justificativaRoot,
    addJustificativa,
    justificativaList,
    updateJustificativa,
    deleteJustificativaByQuery
};