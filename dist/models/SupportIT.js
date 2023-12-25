"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = __importDefault(require("./Person"));
class SupporIT extends Person_1.default {
    constructor(id, name, birthday, address, type, company, settle) {
        super(id, name, birthday, address);
        this.type = type;
        this.company = company;
        this.settle = settle;
    }
}
exports.default = SupporIT;
