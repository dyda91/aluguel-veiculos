import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../repositories/CustomerRepository';
import { employeeRepository } from '../repositories/EmployeeRepository';

class EmailMiddleware {
  async validateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    try {
      const existingCustomer = await customerRepository.getAllCustomers().find(
        (customer) => customer.email === email
      );

      const existingEmployee = await employeeRepository.getAllEmployees().find(
        (employee) => employee.email === email
      );

      if(existingEmployee) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      if (existingCustomer) {
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