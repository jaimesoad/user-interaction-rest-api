import {createHash, randomBytes} from "crypto";
import db from "../data/data";
import {Authed, Salt, User} from "../models/models";
import jwt from "jsonwebtoken";
import {ACCESS_KEY} from "../config";

// Returns the hash of the password created by the user
export function Utils(passwd: string): string {
    return createHash('sha256').update(passwd).digest('hex')
}

export function GenPasswordSalt() {
    return randomBytes(8).toString('base64').slice(0, 8)
}

export async function AuthUser(username: string, password: string) {
    const salt = (await db.query('call UserSalt(?)', [username]) as unknown[][][])[0][0][0] as Salt

    const passwd = Utils(password + salt.PassSalt)

    const authUser = (await db.query('call VerificarUsuario(?, ?)', [username, passwd]) as unknown[][][])[0][0][0] as Authed

    return authUser.authed === 1
}

export function CreateNewToken(username: string) {
    const user: User = {name: username}
    return jwt.sign(user, ACCESS_KEY, {expiresIn: '15m'})
}