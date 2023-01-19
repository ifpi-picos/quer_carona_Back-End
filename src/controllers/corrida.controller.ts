import { Corrida } from "@prisma/client";
import { CorridaRepository } from "../repositories";

export class CorridaController {
    constructor(private corridaRepository: CorridaRepository) {}

    async findAll() {
        return this.corridaRepository.findAll();
    }

    async findOne(corridaId: string) {
        return this.corridaRepository.findOne(corridaId);
    }

    async findCorridasGiven(userId: string) {
        return this.corridaRepository.findCorridasGiven(userId);
    }

    async findCorridasTaken(userId: string) {
        return this.corridaRepository.findCorridasTaken(userId)
    }

    async giveCorrida(data: Omit<Corrida, 'id' | 'motoristaId'>, userId: string) {
        return this.corridaRepository.giveCorrida(data, userId);
    }

    async takeCorrida(corridaId: string, userId: string) {
        return this.corridaRepository.takeCorrida(corridaId, userId);
    }

    async startCorrida(corridaId: string, userId: string) {
        return this.corridaRepository.startCorrida(corridaId, userId);
    }

    async findAvailableCorridas(userId: string) {
        return this.corridaRepository.findAvailableCorridas(userId);
    }


}