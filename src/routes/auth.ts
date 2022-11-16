import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { UserController } from "../controllers";
import { UserRepository } from "../repositories";
import { sign } from "jsonwebtoken";
const router = Router();
const client = new PrismaClient();

const userRepository = new UserRepository(client);
const controller = new UserController(userRepository);

router.post("/login", async (req: Request, res: Response) => {
    const { body: data } = req;
    const user = await controller.login(data);
    const secret = process.env['TOKEN_SECRET'];
    if (!secret) throw {message: "Token Secret not defined"};
    const token = sign({id: user.id}, secret);
    res.cookie("token", token, {secure: process.env['NODE_ENV'] == "production", httpOnly: true, sameSite: 'lax'});
    res.send({message: "Login set successfully"});
})

export default router;