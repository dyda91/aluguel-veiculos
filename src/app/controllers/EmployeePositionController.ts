import { Request, Response, NextFunction } from 'express';
import { employeePositionFindAllService } from '../services/employeePositionServices/EmployeePositionFindAllService';
import { employeePositionFindByIdService } from '../services/employeePositionServices/EmployeePositionFindByIdService';
import { employeePositionCreateService } from '../services/employeePositionServices/EmployeePositionCreateService';

class EmployeePositionController {
    async findAll(req: Request, res: Response, next: NextFunction) {
      try {
        const employeePositions = await employeePositionFindAllService.findAll();
        res.send(employeePositions);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  
    async findById(req: Request, res: Response, next: NextFunction) {
      try {
        const id = req.params.id;
        const employeePosition = await employeePositionFindByIdService.findById(id);
  
        if (employeePosition) {
          res.send(employeePosition);
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
        const newEmployeePosition = await employeePositionCreateService.create({name: upperCaseName});
        res.status(201).send(newEmployeePosition);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  }
  
  const employeePositionController = new EmployeePositionController();
  
  export { employeePositionController };