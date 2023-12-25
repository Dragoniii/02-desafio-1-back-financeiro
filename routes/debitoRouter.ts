import { Router } from "express";
import {
    debitoRoot,
    addDebito,
    debitoList,
    updateDebito,
    deleteDebitoByQuery
} from "../controllers/debitoController";


const debitoRouter = Router();

debitoRouter.get("/", debitoRoot);

debitoRouter.post("/addDebito", addDebito);

debitoRouter.get("/debitoList", debitoList);

debitoRouter.put("/updateDebito", updateDebito);

debitoRouter.delete("/deleteDebito", deleteDebitoByQuery);

export default debitoRouter;