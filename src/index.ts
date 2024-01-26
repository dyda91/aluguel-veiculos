import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { customerRoutes, rentalRoutes, vehicleRoutes, loginRoutes, employeeRoutes } from './routes';

const port = process.env.PORT!;
const app = express();

app.use(express.json());
app.use(customerRoutes);
app.use(rentalRoutes);
app.use(vehicleRoutes);
app.use(loginRoutes);
app.use(employeeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
