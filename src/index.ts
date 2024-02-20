import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { routes } from './routes';

const port = process.env.PORT!;
const app = express();

app.use(express.json());
app.use(routes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
