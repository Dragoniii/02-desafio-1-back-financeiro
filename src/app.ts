import express from "express";
import dotenv from "dotenv";
import creditoRouter from "../routes/creditoRouter";
import debitoRouter from "../routes/debitoRouter";
import dinheiroRouter from "../routes/dinheiroRouter";
import login from "../routes/login";
import valeRouter from "../routes/valeRouter";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;
const usuario = process.env.USUARIO;
const senha = process.env.SENHA;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Welcome");
// });

app.use("/credito", creditoRouter);
app.use("/debito", debitoRouter);
app.use("/dinheiro", dinheiroRouter);
app.use("/vale", valeRouter);
app.use("/login", login);

app.listen(port, () => {
    console.log("Connection with SQLite has been estabilished");
    console.log(`Servidor escutando na porta ${port}`);
})

export default {
    usuario, 
    senha
}