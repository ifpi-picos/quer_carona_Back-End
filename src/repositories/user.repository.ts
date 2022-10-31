import { User } from "../models/user";
import { PrismaClient } from "@prisma/client";
export class UserRepository {
    private client: PrismaClient;
    constructor(client: PrismaClient) {
        this.client = client;
    }
    async findAll() {
        return await this.client.usuario.findMany();
    } 

    async create(data: Omit<User, 'id'>) {
        const newUser = await this.client.usuario.create({data});
        console.log(newUser);
        return newUser;
    }

    async findOne(id: number) {
        return await this.client.usuario.findUnique({where: {id}});
    }

    
}