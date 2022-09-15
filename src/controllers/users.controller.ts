import { User } from "../models/user";
import { UserRepository } from "../repositories";

export class UserController {

    constructor(private userRepository: UserRepository) {}
    findAll() {
        return this.userRepository.findAll();
    }

    create(data: Omit<User, 'id'>) {
        return this.userRepository.create(data);
    }

    findOne(id: string) {
        return this.userRepository.findOne(id);
    }
}