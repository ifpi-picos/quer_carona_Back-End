export interface User {
    id: string;
    email: string;
    nome: string;
    data_nascimento: Date;
    senha: string;
    salt_senha: string;
}