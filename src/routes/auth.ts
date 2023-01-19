import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { UserController } from "../controllers";
import { UserRepository } from "../repositories";
import { sign } from "jsonwebtoken";
import { authorize } from "../util/authorization";
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
    res.cookie("token", token, {secure: true, httpOnly: true, sameSite: 'lax'});
    res.send({message: "Login set successfully", user: user});
})

router.post("/logout", async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.send({message: "Logout successfully"});
});

router.get("/me", authorize,async (req: Request, res: Response) => {
    const user = await controller.findOne(res.locals["userId"]);
    if (!user) return res.status(404).send({message: "User not found"});
    return res.send({user});
});

export default router;