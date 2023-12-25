import { Router } from "express";
import {
    creditoRoot,
    addCredito,
    creditoList,
    updateCredito,
    deleteCreditoByQuery
} from "../controllers/creditoController";


const creditoRouter = Router();

creditoRouter.get("/", creditoRoot);

creditoRouter.post("/addCredito", addCredito);

creditoRouter.get("/creditoList", creditoList);

creditoRouter.put("/updateCredito", updateCredito);

creditoRouter.delete("/deleteCredito", deleteCreditoByQuery);

export default creditoRouter;