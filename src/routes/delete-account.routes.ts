import {Router} from "express";
import {AuthToken} from "../middleware/authToken";
import * as ct from "../controllers/delete-account.controller"

const router = Router()

router.delete("/delete-account", AuthToken, ct.deleteAccount)
export default router