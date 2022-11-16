import { User } from "../models/user";
import { PrismaClient } from "@prisma/client";
import { encryptPassword, comparePassword } from "../util/encryption";
export class UserRepository {
    private client: PrismaClient;
    constructor(client: PrismaClient) {
        this.client = client;
    }
    async findAll() {
        return await this.client.usuario.findMany();
    } 

    async create(data: Omit<User, 'id' | 'salt_senha'>) {
        const {salt, encryptedPassword} = encryptPassword(data.senha);
        const userData: Omit<User, 'id'> = {
            ...data,
            salt_senha: salt,
            senha: encryptedPassword
        }
        const newUser = await this.client.usuario.create({data: userData});
        const {senha, salt_senha, ...returnData} = newUser;
        return returnData;
    }

    async findOne(id: number) {
        return await this.client.usuario.findUnique({where: {id}});
    }

    async login(email: string, senha: string) {
        const account = await this.client.usuario.findUnique({where: {email: email}});
        if (!account) throw {message: "Usuario não encontrado"};
        const result = comparePassword(account.senha, account.salt_senha, senha);
        if (!result) throw {message: "Senha incorreta"};
        return account;
    }   
    
}