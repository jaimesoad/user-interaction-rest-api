import {Router} from "express";
import * as ct from "../controllers/signup.controller"

// This router is in charge of all operations happening on /login.
const router = Router()

router.post("/signup", ct.signup)

export default router