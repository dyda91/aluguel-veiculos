import { Router } from "express";
import { vehicleController } from "../controllers/VehicleController";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { existingVehicleMiddleware } from "../middleware/ExistingVehicleMiddleware";
import { vehicleCategoryMiddleware } from "../middleware/VehicleCategoryMiddleware";
import { validPlateFormat } from "../middleware/ValidPlateFormat";

const vehicleRoutes = Router();

// Get
vehicleRoutes.get('/vehicles',
    authMiddleware,
    vehicleController.getAllVehicles
);

vehicleRoutes.get('/vehicles/:plate',
    authMiddleware,
    vehicleController.getVehicleByPlate
);

// Post
vehicleRoutes.post('/vehicles',
    authMiddleware,
    existingVehicleMiddleware.check,
    validPlateFormat.validatePlate,
    vehicleCategoryMiddleware.validateCategory,
    vehicleController.createVehicle
);

export { vehicleRoutes };