export class IUser {
    email: string | undefined;
    usuario: string | undefined;
    senha: string | undefined;
    nome: string | undefined;
    dataNasc: Date | undefined;
    generoMusical: string[] | undefined;
    instrumentos: [{
        nomeInstrumento: string;
        nivelExperiencia: string;
    }] | undefined;
    estadoUF: string | undefined;
    cidade: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}
