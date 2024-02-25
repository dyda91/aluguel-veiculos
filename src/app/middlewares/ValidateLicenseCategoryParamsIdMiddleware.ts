import { Request, Response, NextFunction } from 'express';
import { licenseCategoryRepository } from '../../infra/db/sequelize/repositories/licenseCategoryRepository';
import { AppError } from '../errors/AppError';

class ValidateLicenseCategoryParamsIdMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const licenseCategory = await licenseCategoryRepository.findById(id);

            if (!licenseCategory) {
                return res.status(400).send({ error: 'Categoria de Licença inválida!' });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateLicenseCategoryParamsIdMiddleware = new ValidateLicenseCategoryParamsIdMiddleware();

export { validateLicenseCategoryParamsIdMiddleware }