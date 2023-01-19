import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
export async function authorize(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies["token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const secret = process.env['TOKEN_SECRET'];
        if (!secret) throw {message: "Token Secret not defined"};
        const decoded = verify(token, secret);
        res.locals.userId = (decoded as JwtPayload).id;
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}
