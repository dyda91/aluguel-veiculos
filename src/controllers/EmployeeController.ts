import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../services/EmployeeService';

class EmployeeController {
  async getAllEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await employeeService.getAllEmployees();
      res.send(employees);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = req.params.id;
      const employee = await employeeService.getEmployeeById(employeeId);

      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ error: 'Colaborador não encontrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, cpf, email, password, phone, licenseCategory, position } = req.body;

      if (!name || !cpf || !email || !password || !phone || !licenseCategory || !position) {
        res.status(400).json({ error: 'Necessário fornecer todos os dados' });
        return next();
      }
      
      const newEmployee = await employeeService.createEmployee(
        name,
        cpf,
        email,
        password,
        phone,
        licenseCategory,
        position
      );
      res.status(201).json(newEmployee);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const employeeController = new EmployeeController();

export { employeeController };