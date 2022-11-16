import { genSaltSync, hashSync, compareSync } from "bcryptjs";
export function encryptPassword(password: string, salt?: string) {
    if (!salt) {
        salt = genSaltSync();
    }
    const encryptedPassword = hashSync(password, salt);
    return {salt, encryptedPassword}

}

export function comparePassword(password: string, salt: string, comparation: string) {
    return compareSync(comparation, password)
}