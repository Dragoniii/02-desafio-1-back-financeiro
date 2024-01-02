"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const loginRouter = (0, express_1.Router)();
loginRouter.get("/", loginController_1.loginRoot);
loginRouter.post("/doLogin", loginController_1.doLogin);
exports.default = loginRouter;
