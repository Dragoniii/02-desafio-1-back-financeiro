"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const justificativaController_1 = require("../controllers/justificativaController");
const justificativaRouter = (0, express_1.Router)();
justificativaRouter.get("/", justificativaController_1.justificativaRoot);
justificativaRouter.post("/addJustificativa", justificativaController_1.addJustificativa);
justificativaRouter.get("/justificativaList", justificativaController_1.justificativaList);
justificativaRouter.put("/updateJustificativa", justificativaController_1.updateJustificativa);
justificativaRouter.delete("/deleteJustificativaByQuery", justificativaController_1.deleteJustificativaByQuery);
exports.default = justificativaRouter;
