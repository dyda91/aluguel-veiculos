import { Router } from "express";
import { rentalController } from "../controllers/RentalController";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { existingRentalMiddleware } from "../middleware/ExistingRentalMiddleware";


const rentalRoutes = Router();

rentalRoutes.get('/rentals', authMiddleware, rentalController.getAllRentals);
rentalRoutes.get('/rentals/:id', authMiddleware, existingRentalMiddleware.check, rentalController.getRentalById);

rentalRoutes.post('/rentals',
    authMiddleware,
    rentalController.rentVehicle
);

rentalRoutes.post('/rentals/start',
    authMiddleware,
    existingRentalMiddleware.check,
    rentalController.startRental
);

rentalRoutes.post('/rentals/complete',
    authMiddleware,
    existingRentalMiddleware.check,
    rentalController.completeRental
);

export { rentalRoutes};