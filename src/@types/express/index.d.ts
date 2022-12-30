import jwt from "jsonwebtoken";
import {User} from "../../models/models";

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}