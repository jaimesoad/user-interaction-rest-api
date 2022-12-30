import {Router} from "express";
import {AuthToken} from "../middleware/authToken";
import * as ct from "../controllers/info.controller"

const router = Router()

router.get("/info", AuthToken, ct.GetUserInfo)
router.patch("/info", AuthToken, ct.PatchUserInfo)

export default router