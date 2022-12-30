import {Router} from "express";
import * as ct from "../controllers/login.controller"

// This router is in charge of all operations happening on /login.
const router = Router()

router.post("/login", ct.login)

export default router