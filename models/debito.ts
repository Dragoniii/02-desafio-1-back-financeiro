class Debito {
    id: number;
    data: string;
    banco: string;
    valor: number;

    constructor(id: number, data: string, banco: string, valor: number){
        this.id = id;
        this.data = data;
        this.banco = banco;
        this.valor = valor
    }
}

export default Debito;