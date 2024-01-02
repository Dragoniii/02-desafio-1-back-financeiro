"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const creditoRouter_1 = __importDefault(require("../routes/creditoRouter"));
const debitoRouter_1 = __importDefault(require("../routes/debitoRouter"));
const dinheiroRouter_1 = __importDefault(require("../routes/dinheiroRouter"));
const login_1 = __importDefault(require("../routes/login"));
const valeRouter_1 = __importDefault(require("../routes/valeRouter"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome");
});
app.use("/credito", creditoRouter_1.default);
app.use("/debito", debitoRouter_1.default);
app.use("/dinheiro", dinheiroRouter_1.default);
app.use("/vale", valeRouter_1.default);
app.use("/login", login_1.default);
app.listen(port, () => {
    console.log("Connection with SQLite has been estabilished");
    console.log(`Servidor escutando na porta ${port}`);
});
