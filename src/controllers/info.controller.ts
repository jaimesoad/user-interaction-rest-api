import {Request, Response} from "express";
import db from "../data/data";
import {Authed, UserInfo} from "../models/models";
import {ResultSetHeader} from "mysql2";
import {CreateNewToken} from "../utils/utils";

export async function GetUserInfo(req: Request, res: Response) {
    const user = req.user.name

    const row = (await db.query('select * from InfoUsuario where Username = ?', [user]) as unknown[][])[0][0] as UserInfo

    res.json(row)
}

export async function PatchUserInfo(req: Request, res: Response) {
    const {Name, Surname, Username, Email, Age} = req.body
    const user = req.user.name

    // @ts-ignore
    const userExist = (await db.query('call ExisteUsuario(?)', [Username]) as unknown[][])[0][0][0] as Authed
    // @ts-ignore
    const mailExist = (await db.query('call ExisteCorreo(?)', [Username]) as unknown[][])[0][0][0] as Authed

    if (userExist.authed === 1) return res.send(`The user "${Username}" already exists.`)
    if (mailExist.authed === 1) return res.send(`The mail "${Email}" is already in use.`)

    const [result] = await db.query('call ModificarUsuario(?, ?, ?, ?, ?, ?)',
        [
            user,
            Name,
            Surname,
            Username,
            Age,
            Email
        ]) as ResultSetHeader[]

    if (result.affectedRows === 0) return res.send("Something went wrong, data not changed.")

    let accessToken = "No new access token"

    if (Username !== undefined) {
        accessToken = CreateNewToken(Username)
        res.json({
            "message": "Data modified successfully.",
            "accessToken": accessToken
        })
        return
    }

    const row = (await db.query('select * from InfoUsuario where Username = ?', [user]) as unknown[][])[0][0] as UserInfo

    res.json(row)
}