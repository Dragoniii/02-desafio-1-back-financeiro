class Dinheiro {
    id: number;
    data: string;
    motivo: string;
    valor: number;

    constructor(id: number, data: string, motivo: string, valor: number){
        this.id = id;
        this.data = data;
        this.motivo = motivo;
        this.valor = valor
    }
}

export default Dinheiro;