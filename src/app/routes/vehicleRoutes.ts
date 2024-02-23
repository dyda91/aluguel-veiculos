import { Router, Request, Response } from "express";
import { vehicleController } from "../controllers/VehicleController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { authorizationByManagerMiddleware } from "../middlewares/AuthorizationByManagerMiddleware";
import { authorizationByAttendantMiddleware } from "../middlewares/AuthorizationByAttendantMiddleware";
import { validatePlateVehicleMiddleware } from "../middlewares/vehicle/ValidatePlateVehicleMiddleware";
import { validPlateFormatMiddleware } from "../middlewares/vehicle/ValidatePlateFormatMiddleware";
import { validateVehicleCategoryMiddleware } from "../middlewares/vehicle/ValidateVehicleCategoryMiddleware";
import path from "path"

const vehicleRoutes = Router();

// Post
vehicleRoutes.get('/vehicle', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'vehicle.ejs');
    res.render(caminho);
});

vehicleRoutes.post('/vehicles',
    // authMiddleware,
    // authorizationByManagerMiddleware.authorization,
    validPlateFormatMiddleware.validate,
    validatePlateVehicleMiddleware.validate,
    validateVehicleCategoryMiddleware.validate,
    vehicleController.create
);

// Get
vehicleRoutes.get('/vehicles/all',
    // authMiddleware,
    // authorizationByAttendantMiddleware.authorization,
    vehicleController.findAll
);

vehicleRoutes.get('/vehicles/:plate',
    // authMiddleware,
    // authorizationByAttendantMiddleware.authorization,
    vehicleController.findByPlate
);

export { vehicleRoutes };