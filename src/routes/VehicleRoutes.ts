import { Router } from "express";
import { vehicleController } from "../controllers/VehicleController";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { existingVehicleMiddleware } from "../middleware/ExistingVehicleMiddleware";
import { vehicleCategoryMiddleware } from "../middleware/VehicleCategoryMiddleware";
import { validPlateFormatMiddleware } from "../middleware/ValidPlateFormatMiddleware";
import { authorizationByManagerMiddleware } from "../middleware/AuthorizationByManagerMiddleware";
import { authorizationByAttendantMiddleware } from "../middleware/AuthorizationByAttendantMiddleware";

const vehicleRoutes = Router();

// Get
vehicleRoutes.get('/vehicles',
    authMiddleware,
    authorizationByAttendantMiddleware.authorization,
    vehicleController.getAllVehicles
);

vehicleRoutes.get('/vehicles/:plate',
    authMiddleware,
    authorizationByAttendantMiddleware.authorization,
    vehicleController.getVehicleByPlate
);

// Post
vehicleRoutes.post('/vehicles',
    authMiddleware,
    authorizationByManagerMiddleware.authorization,
    existingVehicleMiddleware.check,
    validPlateFormatMiddleware.validatePlate,
    vehicleCategoryMiddleware.validateCategory,
    vehicleController.createVehicle
);

export { vehicleRoutes };