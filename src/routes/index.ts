import { Router } from "express";
import userRouter from "./users";
import authRouter from "./auth";
import corridaRouter from "./corridas";
const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/corridas', corridaRouter);
export default router;