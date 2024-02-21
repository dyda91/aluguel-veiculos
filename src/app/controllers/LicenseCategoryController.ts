import { Request, Response, NextFunction } from 'express';
import { licenseCategoryService } from '../services/LicenseCategoryService';

class LicenseCategoryController {
    async findAll(req: Request, res: Response, next: NextFunction) {
      try {
        const licenseCategories = await licenseCategoryService.findAll();
        res.send(licenseCategories);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  
    async findById(req: Request, res: Response, next: NextFunction) {
      try {
        const id = req.params.id;
        const licenseCategory = await licenseCategoryService.findById(id);
  
        if (licenseCategory) {
          res.send(licenseCategory);
        } else {
          res.status(404).send({ error: 'Licensa não encontrada' });
        }
        
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  
    async create(req: Request, res: Response, next: NextFunction) {
      try {
        const { name } = req.body;
  
        if (!name) {
          res.status(400).send({ error: 'Necessário fornecer todos os dados' });
          return next();
        }
        
        const upperCaseName = name.toUpperCase();
        const newLicenseCategory = await licenseCategoryService.create({name: upperCaseName});
        res.status(201).send(newLicenseCategory);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  }
  
  const licenseCategoryController = new LicenseCategoryController();
  
  export { licenseCategoryController };