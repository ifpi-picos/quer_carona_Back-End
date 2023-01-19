import { genSaltSync, hashSync, compareSync } from "bcryptjs";
export function encryptPassword(password: string, salt?: string) {
    let passSalt = salt;
    if (!passSalt) {
        passSalt = genSaltSync();
    }
    console.log("🚀 ~ file: encryption.ts ~ line 4 ~ encryptPassword ~ let passSalt = salt;", password)
    
    const encryptedPassword = hashSync(password, passSalt);
    return {passSalt, encryptedPassword}

}

export function comparePassword(password: string, salt: string, comparation: string) {
    return compareSync(comparation, password)
}

