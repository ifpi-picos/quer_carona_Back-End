import express from 'express';
import routes from "./routes";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();
console.log(`The connection URL is ${process.env.DATABASE_URL}`)
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use('/', routes);
app.listen(3000, () => {
  console.log('App running in localhost:3000');
});
