import {createPool} from "mysql2/promise"
import {DBUSER, DBPASSWD, DBNAME, DBHOST, DBPORT} from "../config";

/* This is where the connection to the database happens.
 * This object is used all over the project to provide
 * access to the data.
 * */
const db = createPool({
    user: DBUSER,
    password: DBPASSWD,
    database: DBNAME,
    host: DBHOST,
    port: DBPORT
})

export default db