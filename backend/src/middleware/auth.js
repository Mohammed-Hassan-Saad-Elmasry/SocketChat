import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/errorhandling.js';
import {authModel} from '../../db/model/auth.model.js';


export const roles = {
    Admin: "Admin",
    User: "User",
};
export const auth = (accessRoles = []) => {
    return asyncHandler(async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return next(new Error("In-valid Bearer Key", { cause: 400 }));
        }
        const token = authorization.split("Bearer ")[1];
        if (!token) {
            return next(new Error(" In-valid Token", { cause: 400 }));
        }
        const decoded = jwt.verify(token, "Hamo");
        if (!decoded?.id) {
            return next(new Error("invalid token payload  ", { cause: 400 }));
        }

        const user = await authModel.findById({ _id: decoded.id })
        if (!user) {
            return next(new Error("not register account  ", { cause: 404 }));
        }

        if (!accessRoles.includes(user.role)) {
            return next(new Error("not authorized user  ", { cause: 403 }));
        }
        req.user = user;
        next();
    });
};

