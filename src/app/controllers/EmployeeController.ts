import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../services/EmployeeService';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../helpers/createTemplate";
import { licenseCategoryService } from '../services/LicenseCategoryService';
import { employeePositionService } from '../services/EmployeePositionService';

class EmployeeController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await employeeService.findAll();
      res.status(200).format({
        'application/json': () => {
          res.send(employees);
        },
        'text/html': () => {
          const caminhoTemplate = createTemplate(path.resolve(
            __dirname,
            '..',
            '..',
            'infra',
            'templates',
            'handlebars',
            'employeesFindAll.hbs'
          ));

          const template = handlebars.compile(caminhoTemplate);
          res.send(template({
            employees
          }));
        }
      })
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = req.params.id;
      const employee = await employeeService.findById(employeeId);

      if (employee) {
        res.status(200).format({
          'application/json': () => {
            res.send(employee);
          },
          'text/html': () => {
            const caminhoTemplate = createTemplate(path.resolve(
              __dirname,
              '..',
              '..',
              'infra',
              'templates',
              'handlebars',
              'employeeFind.hbs'
            ));

            const template = handlebars.compile(caminhoTemplate);
            res.send(template({
              id: employee.id,
              name: employee.name,
              cpf: employee.cpf,
              email: employee.email,
              phone: employee.phone,
              licenseCategory: employee.licenseCategory,
              position: employee.position


            }));
          }
        })
      } else {
        res.status(404).send({ error: 'Colaborador não encontrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, cpf, email, password, phone, licenseCategory, position } = req.body;

      if (!name || !cpf || !email || !password || !phone || !licenseCategory || !position) {
        res.status(400).send({ error: 'Necessário fornecer todos os dados' });
        return next();
      }

      const upperCaseName = name.toUpperCase();
      const lowerCaseEmail = email.toLowerCase();
      const habilitation = (await licenseCategoryService.findAll()).find(item => item.name === licenseCategory.toUpperCase());
      const employeePosition = (await employeePositionService.findAll()).find(item => item.name === position.toUpperCase());

      if (habilitation && employeePosition) {
        const newEmployee = await employeeService.create({
          name: upperCaseName,
          cpf,
          email: lowerCaseEmail,
          password,
          phone,
          licenseCategory: habilitation.id,
          position: employeePosition.id
        });
        res.status(201).format({
          'application/json': () => {
            res.send(newEmployee);
          },
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const employeeController = new EmployeeController();

export { employeeController };