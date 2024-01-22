import { Request, Response, NextFunction } from 'express';
import { LicenseCategory } from '../models/Customer';

class LicenseCategoryMiddleware {
  validateLicenseCategory(req: Request, res: Response, next: NextFunction) {
    const { licenseCategory } = req.body;

    try {
      if (!Object.values(LicenseCategory).includes(licenseCategory)) {
        return res.status(400).json({ error: 'Licença inválida' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const licenseCategoryMiddleware = new LicenseCategoryMiddleware();

export { licenseCategoryMiddleware };