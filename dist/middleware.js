import jwt from "jsonwebtoken";
import { JWT_Password } from "./config.js";
export const userAuth = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, JWT_Password);
    if (decoded) {
        //@ts-ignore
        req.userid = decoded.id;
        console.log("UserId Being Assigned");
        next();
    }
    else {
        res.status(404).json({
            message: "You are not logged in"
        });
    }
};
//# sourceMappingURL=middleware.js.map