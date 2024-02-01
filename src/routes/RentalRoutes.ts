import { Router } from "express";
import { rentalController } from "../controllers/RentalController";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { existingRentalMiddleware } from "../middleware/ExistingRentalMiddleware";
import { authorizationByAttendantMiddleware } from "../middleware/AuthorizationByAttendantMiddleware";
import { authorizationByManagerMiddleware } from "../middleware/AuthorizationByManagerMiddleware";

const rentalRoutes = Router();

// Get
rentalRoutes.get('/rentals',
    authMiddleware,
    authorizationByManagerMiddleware.authorization,
    rentalController.getAllRentals
);

rentalRoutes.get('/rentals/:id',
    authMiddleware,
    authorizationByAttendantMiddleware.authorization,
    existingRentalMiddleware.check,
    rentalController.getRentalById
);

// Post
rentalRoutes.post('/rentals',
    authMiddleware,
    rentalController.rentVehicle
);

rentalRoutes.post('/rentals/start',
    authMiddleware,
    authorizationByAttendantMiddleware.authorization,
    existingRentalMiddleware.check,
    rentalController.startRental
);

rentalRoutes.post('/rentals/complete',
    authMiddleware,
    authorizationByAttendantMiddleware.authorization,
    existingRentalMiddleware.check,
    rentalController.completeRental
);

export { rentalRoutes };