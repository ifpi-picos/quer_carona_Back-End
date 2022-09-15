import { User } from "../models/user";

export class UserRepository {
    users: User[] = []
    findAll() {
        return this.users;
    } 

    create(data: Omit<User, 'id'>) {
        const newUser = {...data, id: (this.users.length + 1).toString()}
        this.users.push(newUser);
        return newUser;
    }

    findOne(id: string) {
        return this.users.find((el) => el.id === id);
    }

    
}