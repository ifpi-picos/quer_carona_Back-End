import { Request, Response, Router } from "express";
import { UserController } from "../controllers";
import { UserRepository } from "../repositories";

const router = Router();

const userRepository = new UserRepository();
const controller = new UserController(userRepository);

router.get("/", (req: Request, res: Response) => {
  return res.status(200).send(controller.findAll());
});

router.post("/", (req: Request, res: Response) => {
  const { body: data } = req;
  return res.status(201).send(controller.create(data));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = controller.findOne(id);
  if (user) return res.status(200).send(user);
  return res.status(404).send({ message: "User not found" });
});

export default router;
