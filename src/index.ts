import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { customerRoutes, rentalRoutes, vehicleRoutes, loginRoutes } from './routes';

const port = process.env.PORT!;
const app = express();

app.use(express.json());
app.use({customerRoutes, rentalRoutes, vehicleRoutes, loginRoutes});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
