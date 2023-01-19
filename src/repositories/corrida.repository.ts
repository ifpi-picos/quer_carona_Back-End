import { User } from "../models/user";
import { Corrida, PrismaClient } from "@prisma/client";
import { set } from "date-fns";

export class CorridaRepository {
    private client: PrismaClient;
    constructor(client: PrismaClient) {
        this.client = client;
    }
    async findAll() {
        return await this.client.corrida.findMany();
    }

    async findOne(corridaId: string) {
        return await this.client.corrida.findFirst({
            where: {
                id: parseInt(corridaId)
            },
            include: {
                passageiros: true,
                motorista: true
            }
        })
    }

    async findCorridasGiven(userId: string) {
        return await this.client.corrida.findMany(
            {
                where: {
                    motorista: {
                        id: parseInt(userId)
                    }
                }
            }
        );
    }

    async findCorridasTaken(userId: string) {
        return await this.client.corrida.findMany({
            where: {
                passageiros: {
                    every: {
                        passageiroId: parseInt(userId)
                    }
                },
                finalizada: true
            }
        })
    }

    async giveCorrida(data: Omit<Corrida, 'id' | 'motoristaId'>, userId: string) {
        const newCorrida = await this.client.corrida.create({
            data: {
                ...data,
                finalizada: false,
                vagas: parseInt(data.vagas as unknown as string),
                horario: set(new Date(), {
                    hours: parseInt((data.horario as unknown as string).split(':')[0]),
                    minutes: parseInt((data.horario as unknown as string).split(':')[1])
                }),
                motorista: {
                    connect: {
                        id: parseInt(userId)
                    }
                }
            }
        })
        return newCorrida;
    }

    async takeCorrida(corridaId: string, userId: string) {
        const corrida = await this.findOne(corridaId);
        if (corrida?.vagas && corrida.vagas > 0) {
            return await this.client.corrida.update({
                where: {
                    id: parseInt(corridaId)
                },
                data: {
                    vagas: corrida.vagas - 1,
                    passageiros: {
                        connectOrCreate: {
                            create: {
                                passageiro: {
                                    connect: {
                                        id: parseInt(userId)
                                    }
                                }
                            },
                            where: {
                                corridaId_passageiroId: {
                                    corridaId: parseInt(corridaId),
                                    passageiroId: parseInt(userId)
                                }
                            }
                        }
                    }
                },
                include: {
                    motorista: true,
                    passageiros: true
                }
            })
        }
        throw new Error("Sem vagas disponiveis")
        
    }

    async startCorrida(corridaId: string, userId: string) {
        const corrida = await this.client.corrida.findFirst({
            where: {
                id: parseInt(corridaId),
                motoristaId: parseInt(userId),
                finalizada: false
            }
        })
        if (corrida) {
            return await this.client.corrida.update({
                where: {
                    id: parseInt(corridaId),
                },
                data: {
                    finalizada: true
                },
                include: {
                    motorista: true,
                    passageiros: true
                }
            })
        }
        throw new Error("Corrida invalida")
    }

    async findAvailableCorridas(userId: string) {
        return await this.client.corrida.findMany({
            where: {
                NOT: {
                    motorista: {
                        id: parseInt(userId)
                    }
                },
                finalizada: false
            },
            include: {
                motorista: true,
                passageiros: true
            }
        })
    }

}