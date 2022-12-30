import {config} from "dotenv"

config()

/* All the constants which may vary from development
 * to production.
 * */

export const PORT = Number(process.env.PORT)
export const HOST = process.env.HOST
export const DBHOST = process.env.DBHOST
export const DBPORT = Number(process.env.DBPORT)
export const DBUSER = process.env.DBUSER
export const DBPASSWD = process.env.DBPASSWD
export const DBNAME = process.env.DBNAME
export const ACCESS_KEY = process.env.ACCESS_KEY
