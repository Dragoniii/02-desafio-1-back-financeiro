"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Credito {
    constructor(id, data, banco, parcelado, vista) {
        this.id = id;
        this.data = data;
        this.banco = banco;
        this.parcelado = parcelado;
        this.vista = vista;
    }
}
exports.default = Credito;
