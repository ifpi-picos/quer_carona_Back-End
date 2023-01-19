import { Request, Response, Router } from "express";
import { CorridaController, UserController } from "../controllers";
import { CorridaRepository, UserRepository } from "../repositories";
import { PrismaClient } from "@prisma/client";
import { authorize } from "../util/authorization";

const router = Router();
const client = new PrismaClient();

const corridaRepository = new CorridaRepository(client);
const controller = new CorridaController(corridaRepository);

router.get("/", authorize, async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await controller.findAll());
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", authorize, async (req: Request, res: Response) => {
  try {
    const { body: data } = req;
  const { userId } = res.locals;
  return res.status(201).send(await controller.giveCorrida(data, userId));
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/given", authorize, async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
  return res.status(200).send(await controller.findCorridasGiven(userId));
  } catch (error) {
    return res.status(500).send(error);
  }
});


router.get("/available", authorize, async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
  return res.status(200).send(await controller.findAvailableCorridas(userId));
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/taken", authorize, async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
  return res.status(200).send(await controller.findCorridasGiven(userId));
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", authorize, async (req: Request, res: Response) => {
  try {
    const { id: corridaId } = req.params;
  return res.status(200).send(await controller.findOne(corridaId));
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.put("/:id", authorize, async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
    const { id: corridaId } = req.params;
    return res.status(200).send(await controller.takeCorrida(corridaId, userId));
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/:id/start", authorize, async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
    const { id: corridaId } = req.params;
    return res.status(200).send(await controller.startCorrida(corridaId, userId));
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
