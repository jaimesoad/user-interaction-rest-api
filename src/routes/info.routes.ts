import {Router} from "express";
import {AuthToken} from "../middleware/authToken";
import * as ct from "../controllers/info.controller"

// This router is in charge of all operations happening on /info.
const router = Router()

router.get("/info", AuthToken, ct.GetUserInfo)
router.patch("/info", AuthToken, ct.PatchUserInfo)

export default router