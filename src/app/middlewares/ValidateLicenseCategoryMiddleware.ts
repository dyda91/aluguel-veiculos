import { Request, Response, NextFunction } from 'express';
import { licenseCategoryRepository } from '../../infra/db/sequelize/repositories/licenseCategoryRepository';

class ValidateLicenseCategoryMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { licenseCategory } = req.body;
      const employeePosition = ((await licenseCategoryRepository.findAll()).
        find(item => item.name === licenseCategory.toUpperCase())
      );


      if (!employeePosition) {
        return res.status(400).json({ error: 'Habilitação inválida' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const validateLicenseCategoryMiddleware = new ValidateLicenseCategoryMiddleware();

export { validateLicenseCategoryMiddleware };