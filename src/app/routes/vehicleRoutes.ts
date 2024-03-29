import { Router, Request, Response } from "express";
import { vehicleController } from "../controllers/VehicleController";
import { employeeAuthCookieMiddleware } from "../middlewares/employee/EmployeeAuthCookieMiddleware";
import { authorizationByManagerMiddleware } from "../middlewares/employee/AuthorizationForManagerMiddleware";
import { authorizationByAttendantMiddleware } from "../middlewares/employee/AuthorizationForAttendantMiddleware";
import { validPlateFormatMiddleware } from "../middlewares/vehicle/ValidatePlateFormatMiddleware";
import { validateVehicleCategoryMiddleware } from "../middlewares/vehicle/ValidateVehicleCategoryMiddleware";
import { existingVehicleMiddleware } from "../middlewares/vehicle/ExistingVehicleMiddleware";
import { validateVehicleParamsPlateMiddleware } from "../middlewares/vehicle/ValidateVehicleParamsPlateMiddleware";
import path from "path"



const vehicleRoutes = Router();

// Post
vehicleRoutes.get('/vehicle', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'vehicle.ejs');
    res.render(caminho);
});

vehicleRoutes.post('/vehicles',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    validPlateFormatMiddleware.validate,
    existingVehicleMiddleware.check,
    validateVehicleCategoryMiddleware.validate,
    vehicleController.create
);

// Get
vehicleRoutes.get('/vehicles/all',
    employeeAuthCookieMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    vehicleController.findAll
);

vehicleRoutes.get('/vehicles/:plate',
    employeeAuthCookieMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    validateVehicleParamsPlateMiddleware.validate,
    vehicleController.findByPlate
);

export { vehicleRoutes };