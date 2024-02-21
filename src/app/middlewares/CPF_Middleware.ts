import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../../infra/db/sequelize/repositories/customerRepository';
import { employeeRepository } from '../../infra/db/sequelize/repositories/employeeRepository';
import bcrypt from 'bcrypt';

class CPF_Middleware {
  async validateCPF(req: Request, res: Response, next: NextFunction) {
    const { cpf } = req.body;

    try {
      const customer = await customerRepository.findByCpf(cpf);
      const compareCustomerCpf = await bcrypt.compareSync(cpf, (await customer).cpf)
      
      const employee = await employeeRepository.findByCpf(cpf)
      const compareEmployeeCpf = await bcrypt.compareSync(cpf, (await employee).cpf)
      

      if(compareEmployeeCpf) {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }

      if (compareCustomerCpf) {
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
