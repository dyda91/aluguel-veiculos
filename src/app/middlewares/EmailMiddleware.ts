import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../../infra/db/sequelize/repositories/customerRepository';
import { employeeRepository } from '../../infra/db/sequelize/repositories/employeeRepository';

class EmailMiddleware {
  async validateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    try {
      const customer = await customerRepository.findByEmail(email)
        const compareCustomerEmail = await customer.email === email
      

        const employee = await customerRepository.findByEmail(email)
        const compareEmployeeEmail = await employee.email === email

      if(compareEmployeeEmail) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      if (compareCustomerEmail) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const emailMiddleware = new EmailMiddleware();

export { emailMiddleware };