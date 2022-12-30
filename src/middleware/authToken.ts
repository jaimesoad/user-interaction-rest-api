import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {ACCESS_KEY} from "../config";
import {User} from "../models/models";

// Verifies if the token coming from the user is a valid token.
export function AuthToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    const authToken = authHeader && authHeader.split(' ')[1]

    if (authToken === null) return res.status(401)

    jwt.verify(authToken, ACCESS_KEY, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user as unknown as User
        next()
    })
}