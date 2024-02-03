import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../repositories/CustomerRepository';
import { employeeRepository } from '../repositories/EmployeeRepository';
import bcrypt from 'bcrypt';

class CPF_Middleware {
  async validateCPF(req: Request, res: Response, next: NextFunction) {
    const { cpf } = req.body;

    try {
      const existingCustomer = await customerRepository.getAllCustomers().find(
        (customer) => bcrypt.compareSync(cpf, customer.cpf)
      );
      const existingEmployee = await employeeRepository.getAllEmployees().find(
        (employee) => bcrypt.compareSync(cpf, employee.cpf)
      );

      if(existingEmployee) {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }

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
      next(error);
    }
  }
}

const cpf_Middleware = new CPF_Middleware();

export { cpf_Middleware };
