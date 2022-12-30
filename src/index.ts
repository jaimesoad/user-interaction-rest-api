/*
 * Main file, this is where the server an all functionality happens.
 * */

import express from "express"
import {PORT} from "./config";
import loginRoutes from "./routes/login.routes";
import infoRoutes from "./routes/info.routes";
import signupRoutes from "./routes/signup.routes";
import deleteAccountRoutes from "./routes/delete-account.routes";
import userRoutes from "./routes/user.routes";

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("CRUD Application REST API.")
})

app.use(loginRoutes)
app.use(infoRoutes)
app.use(signupRoutes)
app.use(deleteAccountRoutes)
app.use(userRoutes)

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${PORT}`)
})