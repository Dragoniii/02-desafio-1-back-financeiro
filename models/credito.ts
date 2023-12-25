class Credito {
    id: number;
    data: string;
    banco: string;
    parcelado: number;
    vista: number;

    constructor(id: number, data: string, banco: string, parcelado: number, vista: number){
        this.id = id;
        this.data = data;
        this.banco = banco;
        this.parcelado = parcelado;
        this.vista = vista
    }
}

export default Credito;