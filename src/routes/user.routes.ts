import {Router} from "express";
import {AuthToken} from "../middleware/authToken";
import * as ct from "../controllers/user.controller"

const router = Router()

router.get("/user/:username", AuthToken, ct.FindUser)

export default router