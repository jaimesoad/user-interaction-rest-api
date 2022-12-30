import {createPool} from "mysql2/promise"
import {DBUSER, DBPASSWD, DBNAME, DBHOST, DBPORT} from "../config";

const db = createPool({
    user: DBUSER,
    password: DBPASSWD,
    database: DBNAME,
    host: DBHOST,
    port: DBPORT
})

export default db