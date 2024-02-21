import { Request, Response, NextFunction } from 'express';
import { customerService } from '../services/CustomerService';

class CustomerController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await customerService.findAll();
      res.send(customers);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.params.id;
      const customer = await customerService.findById(customerId);

      if (customer) {
        res.json(customer);
      } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
      
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, cpf, email, password, phone, licenseCategory } = req.body;

      if (!name || !cpf || !email || !password || !phone || !licenseCategory) {
        res.status(400).json({ error: 'Necessário fornecer todos os dados' });
        return next();
      }

      const newCustomer = await customerService.create({
        name,
        cpf,
        email,
        password,
        phone,
        licenseCategory
      });
      res.status(201).json(newCustomer);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const customerController = new CustomerController();

export { customerController };