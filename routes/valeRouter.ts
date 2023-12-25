import { Router } from "express";
import {
    valeRoot,
    addVale,
    valeList,
    updateVale,
    deleteValeByQuery
} from "../controllers/valeController";


const valeRouter = Router();

valeRouter.get("/", valeRoot);

valeRouter.post("/addVale", addVale);

valeRouter.get("/valeList", valeList);

valeRouter.put("/updateVale", updateVale);

valeRouter.delete("/deleteVale", deleteValeByQuery);
export default valeRouter;