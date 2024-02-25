import { Router, Request, Response } from "express";
import { rentalController } from "../controllers/RentalController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { existingRentalMiddleware } from "../middlewares/ExistingRentalMiddleware";
import { authorizationByAttendantMiddleware } from "../middlewares/employee/AuthorizationForAttendantMiddleware";
import { customerAuthCookieMiddleware } from "../middlewares/customer/CustomerAuthCookieMiddleware";
import path from 'path';


const rentalRoutes = Router();

// Get
rentalRoutes.get('/rentals/reserve', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'rentalsReserve.ejs');
    res.render(caminho);
});

// Post
rentalRoutes.post('/rentals/reserve', customerAuthCookieMiddleware.auth, (req: Request, res: Response) => {
    rentalController.reserveRental
});

rentalRoutes.post('/rentals/start',
    authMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    existingRentalMiddleware.check,
    rentalController.startRental
);

rentalRoutes.post('/rentals/complete',
    authMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    existingRentalMiddleware.check,
    rentalController.completeRental
);

export { rentalRoutes };