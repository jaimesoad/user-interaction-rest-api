import {Request, Response} from "express";
import db from "../data/data";
import {Authed} from "../models/models";

export async function FindUser(req: Request, res: Response) {
    const user = req.params.username

    const userExist = (await db.query('call ExisteUsuario(?)', [user]) as unknown[][][])[0][0][0] as Authed

    if (userExist.authed === 0) return res.status(404).send("User not found.")

    const row = (await db.query('call BuscarUsuario(?)', [user]) as unknown[][][])[0][0][0]

    res.json(row)
}