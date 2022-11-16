import express from 'express';
import routes from "./routes";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
console.log(`The connection URL is ${process.env.DATABASE_URL}`)


const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use('/', routes);
app.listen(3000, () => {
  console.log('App running in localhost:3000');
});
