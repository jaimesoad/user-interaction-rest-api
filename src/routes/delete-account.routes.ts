import {Router} from "express";
import {AuthToken} from "../middleware/authToken";
import * as ct from "../controllers/delete-account.controller"

// This router is in charge of all operations happening on /delete-account.
const router = Router()

router.delete("/delete-account", AuthToken, ct.deleteAccount)
export default router