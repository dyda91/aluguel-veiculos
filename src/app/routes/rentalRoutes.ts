import { Router } from "express";
import { rentalController } from "../controllers/RentalController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { existingRentalMiddleware } from "../middlewares/ExistingRentalMiddleware";
import { authorizationByAttendantMiddleware } from "../middlewares/employee/AuthorizationForAttendantMiddleware";
import { authorizationByManagerMiddleware } from "../middlewares/employee/AuthorizationForManagerMiddleware";

const rentalRoutes = Router();

// Get
rentalRoutes.get('/rentals',
    authMiddleware.auth,
    // authorizationByManagerMiddleware.authorization,
    rentalController.findAll
);

rentalRoutes.get('/rentals/:id',
    authMiddleware.auth,
    // authorizationByAttendantMiddleware.authorization,
    // existingRentalMiddleware.check,
    rentalController.findById
);

// Post
rentalRoutes.post('/rentals',
    authMiddleware.auth,
    rentalController.reserveRental
);

rentalRoutes.post('/rentals/start',
    authMiddleware.auth,
    // authorizationByAttendantMiddleware.authorization,
    // existingRentalMiddleware.check,
    rentalController.startRental
);

rentalRoutes.post('/rentals/complete',
    authMiddleware.auth,
    // authorizationByAttendantMiddleware.authorization,
    // existingRentalMiddleware.check,
    rentalController.completeRental
);

export { rentalRoutes };