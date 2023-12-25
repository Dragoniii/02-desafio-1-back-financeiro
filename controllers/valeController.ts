import { Response, Request, NextFunction } from "express";
import Vale from "../models/vale";
import { createDbConnection } from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";


let db: Database = createDbConnection();

const valeRoot = (req: Request, res: Response) => {
    res.send("Página Inicial Vale");
}

const addVale = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

    if (token == "Bearer 12345") {
        let vale: Vale = req.body;

        let sql = `INSERT INTO vale(data, motivo, valor) VALUES ("${vale.data}", "${vale.vale}", "${vale.valor}")`;

        if (vale.data && vale.vale && vale.valor) {
            db.run(sql,
                (error: Error) => {
                    if (error) {
                        res.end(error.message);
                    }
                    res.send(`Vale Adicionado`);
                })
        } else {
            res.send("Erro na criação da Movimentação. Verifique se todos os campos foram preenchidos");
        }
    } else {
        res.sendStatus(403);
    }



}

const valeList = (req: Request, res: Response) => {


    let valeList: Vale[] = [];

    let sql = `SELECT * FROM vale`;

    db.all(sql, [], (error: Error, rows: Vale[]) => {
        if (error) {
            logger.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row: Vale) => { valeList.push(row) });
        logger.info(req);
        res.send(valeList);
    }
    );
}

const updateVale = (req: Request, res: Response) => {
    logger.info(req);
    let vale: Vale = req.body;
    let sql = `UPDATE vale SET data="${vale.data}", 
                                   motivo="${vale.vale}", 
                                   valor="${vale.valor}"
                                   WHERE id="${vale.id}"
                                   `;


    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("SupportIT Updated");
    });
}

const deleteValeByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `DELETE from vale WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Vale deletado");
    })
}





export {
    valeRoot,
    addVale,
    valeList,
    updateVale,
    deleteValeByQuery
};