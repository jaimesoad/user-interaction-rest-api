import jwt from "jsonwebtoken";
import {User} from "../../models/models";

// Extends functionality to Express.Request.
declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}