import { Router } from "express";
import { vehicleController } from "../controllers/VehicleController";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { existingVehicleMiddleware } from "../middleware/ExistingVehicleMiddleware";
import { vehicleCategoryMiddleware } from "../middleware/VehicleCategoryMiddleware";



const vehicleRoutes = Router();

vehicleRoutes.get('/vehicles', authMiddleware, vehicleController.getAllVehicles);
vehicleRoutes.get('/vehicles/:plate', authMiddleware, vehicleController.getVehicleByPlate);
vehicleRoutes.get('/vehicles/isAvailible', authMiddleware, vehicleController.getVehiclesIsAvaliable);
// vehicleRoutes.get('/vehicles/:category', authMiddleware, vehicleController.getVehiclesByCategoria);


vehicleRoutes.post('/vehicles',
    authMiddleware,
    existingVehicleMiddleware.check,
    vehicleCategoryMiddleware.validateCategory,
    vehicleController.createVehicle
);

export { vehicleRoutes };