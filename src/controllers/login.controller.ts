import {Request, Response} from "express";
import db from "../data/data"
import {AuthUser, CreateNewToken} from "../utils/utils";
import {Authed} from "../models/models";

export async function login(req: Request, res: Response) {
    const username: string = req.body.username
    const password: string = req.body.password

    const existUser = (await db.query('call ExisteUsuario(?)', [username]) as unknown[][][])[0][0][0] as Authed

    if (existUser.authed === 0) return res.send(`User "${username}" does not exist.`)

    const authed = await AuthUser(username, password)

    if (!authed) return res.send("Incorrect username or password.")

    const accessToken = CreateNewToken(username)

    res.json({"accessToken": accessToken})
}