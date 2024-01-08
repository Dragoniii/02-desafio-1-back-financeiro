import { Router } from "express";
import {
    justificativaRoot,
    addJustificativa,
    justificativaList,
    updateJustificativa,
    deleteJustificativaByQuery
} from "../controllers/justificativaController";


const justificativaRouter = Router();

justificativaRouter.get("/", justificativaRoot);

justificativaRouter.post("/addJustificativa", addJustificativa);

justificativaRouter.get("/justificativaList", justificativaList);

justificativaRouter.put("/updateJustificativa", updateJustificativa);

justificativaRouter.delete("/deleteJustificativaByQuery", deleteJustificativaByQuery);

export default justificativaRouter;