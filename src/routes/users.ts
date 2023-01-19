import { Request, Response, Router } from "express";
import { UserController } from "../controllers";
import { UserRepository } from "../repositories";
import { PrismaClient } from "@prisma/client";

const router = Router();
const client = new PrismaClient();

const userRepository = new UserRepository(client);
const controller = new UserController(userRepository);

router.get("/", async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await controller.findAll());
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { body: data } = req;
    return res.status(201).send(await controller.create(data));
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await controller.findOne(id);
    if (user) return res.status(200).send(user);
    return res.status(404).send({ message: "User not found" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
