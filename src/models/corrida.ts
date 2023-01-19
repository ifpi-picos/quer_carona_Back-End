import { User } from "./user";

export interface Corrida {
    id: string;
    start: number[];
    end: number[];
    motorista: User;
    horario: Date;
    vagas: number;
    passageiro: User[];
    finalizado: boolean
}