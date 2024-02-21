import { Router } from "express";
import { rentalController } from "../controllers/RentalController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { existingRentalMiddleware } from "../middlewares/ExistingRentalMiddleware";
import { authorizationByAttendantMiddleware } from "../middlewares/AuthorizationByAttendantMiddleware";
import { authorizationByManagerMiddleware } from "../middlewares/AuthorizationByManagerMiddleware";

const rentalRoutes = Router();

// Get
rentalRoutes.get('/rentals',
    authMiddleware,
    authorizationByManagerMiddleware.authorization,
    rentalController.findAll
);

rentalRoutes.get('/rentals/:id',
    authMiddleware,
    authorizationByAttendantMiddleware.authorization,
    existingRentalMiddleware.check,
    rentalController.findById
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