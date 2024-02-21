import { Router } from "express";
import { vehicleController } from "../controllers/VehicleController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { existingVehicleMiddleware } from "../middlewares/ExistingVehicleMiddleware";
import { vehicleCategoryMiddleware } from "../middlewares/VehicleCategoryMiddleware";
import { validPlateFormatMiddleware } from "../middlewares/ValidPlateFormatMiddleware";
import { authorizationByManagerMiddleware } from "../middlewares/AuthorizationByManagerMiddleware";
import { authorizationByAttendantMiddleware } from "../middlewares/AuthorizationByAttendantMiddleware";

const vehicleRoutes = Router();

// Get
vehicleRoutes.get('/vehicles',
    authMiddleware,
    authorizationByAttendantMiddleware.authorization,
    vehicleController.findAll
);

vehicleRoutes.get('/vehicles/:plate',
    authMiddleware,
    authorizationByAttendantMiddleware.authorization,
    vehicleController.findByPlate
);

// Post
vehicleRoutes.post('/vehicles',
    authMiddleware,
    authorizationByManagerMiddleware.authorization,
    existingVehicleMiddleware.check,
    validPlateFormatMiddleware.validatePlate,
    vehicleCategoryMiddleware.validateCategory,
    vehicleController.create
);

export { vehicleRoutes };