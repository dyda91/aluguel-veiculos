import { Request, Response, NextFunction } from 'express';
import { customerService } from '../services/CustumerService';

class CustomerController {
  async getAllCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await customerService.getAllCustomers(); 
      res.send(customers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getCustomerById(req: Request, res: Response, next: NextFunction) {
    const customerId = req.params.id;

    try {
      const customer = await customerService.getCustomerById(customerId);
      if (customer) {
        res.json(customer);
      } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async createCustomer(req: Request, res: Response, next: NextFunction) {
    const { name, cpf, email, phone, licenseCategory } = req.body;

    if (!name || !cpf || !email || !phone || !licenseCategory) {
      return res.status(400).json({ error: 'Necessário fornecer todos os dados' });
    }

    try {
      const newCustomer = await customerService.createCustomer({ 
        name,
        cpf,
        email,
        phone,
        licenseCategory
      });
      res.status(201).json(newCustomer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

const customerController = new CustomerController();

export { customerController };
