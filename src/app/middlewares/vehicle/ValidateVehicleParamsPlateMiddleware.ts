import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import { AppError } from '../../errors/AppError';
import { vehicleRepository } from '../../../infra/db/sequelize/repositories/vehicleRepository';

class ValidateVehicleParamsPlateMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const plate = req.params.plate;

            const vehicle = await vehicleRepository.findByPlate(plate)

            if (!vehicle) {
                return res.status(400).send({ error: 'Veículo inválido!' });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateVehicleParamsPlateMiddleware = new ValidateVehicleParamsPlateMiddleware();

export { validateVehicleParamsPlateMiddleware }