import {Router} from "express";
import * as ct from "../controllers/signup.controller"

const router = Router()

router.post("/signup", ct.signup)

export default router