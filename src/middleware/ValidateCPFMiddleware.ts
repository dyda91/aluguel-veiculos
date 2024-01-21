import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../repositories/CustomerRepository';

class ValidateCPFMiddleware {
  async validateCPF(req: Request, res: Response, next: NextFunction) {
    const { cpf } = req.body;

    try {
      const existingCustomer = customerRepository.getAllCustomers().find(
        (customer) => customer.cpf === cpf
      );

      if (existingCustomer) {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }

      if (cpf.length !== 11) {
        return res.status(400).json({ error: 'CPF deve ter 11 caracteres' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

const validateCPFMiddleware = new ValidateCPFMiddleware();

export { validateCPFMiddleware };
