import { Router } from "express";
import {
    loginRoot,
    doLogin
} from "../controllers/loginController";

const loginRouter = Router();

loginRouter.get("/", loginRoot);

loginRouter.post("/doLogin", doLogin);

export default loginRouter;