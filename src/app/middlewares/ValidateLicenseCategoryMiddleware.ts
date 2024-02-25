import { Request, Response, NextFunction } from 'express';
import { licenseCategoryRepository } from '../../infra/db/sequelize/repositories/licenseCategoryRepository';
import { AppError } from '../errors/AppError';

class ValidateLicenseCategoryMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { licenseCategory } = req.body;
      const habilitation = ((await licenseCategoryRepository.findAll()).
        find(item => item.name === licenseCategory.toUpperCase())
      );

      if (!habilitation) {
        return res.status(400).json({ error: 'Habilitação inválida' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const validateLicenseCategoryMiddleware = new ValidateLicenseCategoryMiddleware();

export { validateLicenseCategoryMiddleware };