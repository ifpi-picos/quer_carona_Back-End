import express from 'express';
import { Request, Response, Router } from 'express';



const app = express();
const router = Router();

router.get('/', (req:Request, res:Response) => {
  res.send('World!');
});

app.use('/', router);
app.listen(3000, () => {
  console.log('testando');
});