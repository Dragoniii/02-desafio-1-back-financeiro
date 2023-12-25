import { Router } from "express";
import {
    dinheiroRoot,
    addDinheiro,
    dinheiroList,
    updateDinheiro,
    deleteDinheiroByQuery
} from "../controllers/dinheiroController";


const dinheiroRouter = Router();

dinheiroRouter.get("/", dinheiroRoot);

dinheiroRouter.post("/addDinheiro", addDinheiro);

dinheiroRouter.get("/dinheiroList", dinheiroList);

dinheiroRouter.put("/updateDinheiro", updateDinheiro);

dinheiroRouter.delete("/deleteDinheiro", deleteDinheiroByQuery);
export default dinheiroRouter;