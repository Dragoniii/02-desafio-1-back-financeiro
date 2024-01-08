class Justificativa {
    id: number;
    fonte: number;
    diagnostico: string;
    resolucao: string;

    constructor(id: number, fonte: number, diagnostico: string, resolucao: string){
        this.id = id;
        this.fonte = fonte;
        this.diagnostico = diagnostico;
        this.resolucao = resolucao
    }
}

export default Justificativa;