import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { routes } from './app/routes';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const port = process.env.PORT!;
const app = express();

app.use(cookieParser());

app.use(cors({
  origin: [
    'http://127.0.0.1:5501',
    'http://localhost:5501'
  ]
}));

app.use(morgan('[:date[clf]] ":method :url" :status :res[content-length]'));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
