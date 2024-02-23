import { Request, Response, NextFunction } from 'express';
import { rentalStatusFindAllService } from '../services/RentalStatusService/RentalStatusFindAllService';
import { rentalStatusFindByIdService } from '../services/RentalStatusService/RentalStatusFindByIdService';
import { rentalStatusCreateService } from '../services/RentalStatusService/RentalStatusCreateService';


class RentalStatusController {
    async findAll(req: Request, res: Response, next: NextFunction) {
      try {
        const rentalStatus = await rentalStatusFindAllService.findAll();
        res.send(rentalStatus);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  
    async findById(req: Request, res: Response, next: NextFunction) {
      try {
        const id = req.params.id;
        const rentalStatus = await rentalStatusFindByIdService.findById(id);
  
        if (rentalStatus) {
          res.send(rentalStatus);
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
        const { status } = req.body;
  
        if (!status) {
          res.status(400).send({ error: 'Necessário fornecer todos os dados' });
          return next();
        }
        
        const upperCaseStatus = status.toUpperCase();
        const newRentalStatus = await rentalStatusCreateService.create({status: upperCaseStatus});
        res.status(201).send(newRentalStatus);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  }
  
  const rentalStatusController = new RentalStatusController();
  
  export { rentalStatusController };