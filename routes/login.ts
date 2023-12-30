import { Router } from "express";
import {
    addVale,

} from "../controllers/login";


const login = Router();

login.post("/addVale", addVale);

export default login;