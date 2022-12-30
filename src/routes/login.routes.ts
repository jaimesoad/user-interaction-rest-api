import {Router} from "express";
import * as ct from "../controllers/login.controller"

const router = Router()

router.post("/login", ct.login)

export default router