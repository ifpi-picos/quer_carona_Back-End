import express from 'express';
import routes from "./routes";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
console.log(`The connection URL is ${process.env.DATABASE_URL}`)


const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: ["http://localhost:3000", "https://quer-carona-samudebug.vercel.app/"],
  credentials: true
}));

app.use('/', routes);
const port = process.env["PORT"] ?? 3001
app.listen(port, () => {
  console.log(`App running at ${port}`);
});
