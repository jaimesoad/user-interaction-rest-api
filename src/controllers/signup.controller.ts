import {Request, Response} from "express";
import {CreateNewToken, GenPasswordSalt, Utils} from "../utils/utils";
import db from "../data/data";
import {ResultSetHeader} from "mysql2";
import {Authed, User} from "../models/models";

// Creates a new user only if the username and passwords are each unique.
export async function signup(req: Request, res: Response) {
    const username: string = req.body.username
    const email: string = req.body.email

    const ExistUser = (await db.query('call ExisteUsuario(?)', [username]) as unknown[][][])[0][0][0] as Authed

    if (ExistUser.authed === 1) return res.send(`The user "${username}" already exist.`)

    const ExistMail = (await db.query('call ExisteCorreo(?)', [email]) as unknown[][][])[0][0][0] as Authed

    if (ExistMail.authed === 1) return res.send(`The mail "${email}" is already in use.`)

    const name: string = req.body.name
    const surname: string = req.body.surname
    const password: string = req.body.password
    const age: number = req.body.age
    const salt = GenPasswordSalt()

    const passwd = Utils(password + salt)

    try {
        const [response] = await db.query('call NuevoUsuario(?, ?, ?, ?, ?, ?, ?)',
            [
                name,
                surname,
                username,
                passwd,
                age,
                email,
                salt
            ]) as ResultSetHeader[]

        if (response.affectedRows === 0) return res.send("An error ocurred.")

    }catch{
        return res.send("All fields must be filled.")
    }

    const accessToken = CreateNewToken(username)

    res.json({"accessToken": accessToken})
}