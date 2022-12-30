import {Request, Response} from "express";
import {AuthUser} from "../utils/utils";
import db from "../data/data";
import {ResultSetHeader} from "mysql2";

export async function deleteAccount(req: Request, res: Response) {
    const username = req.user.name
    const password: string = req.body.password

    const authed = await AuthUser(username, password)

    if (!authed) return res.send("Incorrect password, please, try again.")

    const [response] = await db.query('call BorrarUsuario(?)', [username]) as ResultSetHeader[]

    if (response.affectedRows === 0) return res.send("An error occurred, user not deleted.")

    res.send("Account deleted successfully!")
}