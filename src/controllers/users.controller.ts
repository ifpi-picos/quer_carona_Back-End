import { User } from "../models/user";
import { UserRepository } from "../repositories";

export class UserController {

    constructor(private userRepository: UserRepository) {}
    
    async findAll() {
        return await this.userRepository.findAll();
    }

    async create(data: Omit<User, 'id'>) {
        return await this.userRepository.create(data);
    }

    async findOne(id: string) {
        return await this.userRepository.findOne(parseInt(id));
    }
}