import { Request, Response, NextFunction } from 'express';
import { customerService } from '../services/CustomerService';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../helpers/createTemplate";
import { licenseCategoryService } from '../services/LicenseCategoryService';

class CustomerController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await customerService.findAll();
      res.status(200).format({
        'application/json': () => {
          res.send(customers);
        },
        'text/html': () => {
          const caminhoTemplate = createTemplate(path.resolve(
            __dirname,
            '..',
            '..',
            'infra',
            'templates',
            'handlebars',
            'customersFindAll.hbs'
          ));

          const template = handlebars.compile(caminhoTemplate);
          res.send(template({
            customers
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
      const customerId = req.params.id;
      const customer = await customerService.findById(customerId);

      if (customer) {
        res.status(200).format({
          'application/json': () => {
            res.send(customer);
          },
          'text/html': () => {
            const caminhoTemplate = createTemplate(path.resolve(
              __dirname,
              '..',
              '..',
              'infra',
              'templates',
              'handlebars',
              'customerFind.hbs'
            ));

            const template = handlebars.compile(caminhoTemplate);
            res.send(template({
              id: customer.id,
              name: customer.name,
              cpf: customer.cpf,
              email: customer.email,
              phone: customer.phone,
              licenseCategory: customer.licenseCategory

            }));
          }
        })
      } else {
        res.status(404).send({ error: 'Cliente não encontrado' });
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
      const { name, cpf, email, password, phone, licenseCategory } = req.body;

      if (!name || !cpf || !email || !password || !phone || !licenseCategory) {
        res.status(400).send({ error: 'Necessário fornecer todos os dados' });
        return next();
      }

      const upperCaseName = name.toUpperCase();
      const lowerCaseEmail = email.toLowerCase();
      const habilitation = (await licenseCategoryService.findAll()).find(item => item.name === licenseCategory.toUpperCase());

      if (habilitation) {
        const newCustomer = await customerService.create({
          name: upperCaseName,
          cpf,
          email: lowerCaseEmail,
          password,
          phone,
          licenseCategory: habilitation.id
        });
        res.status(201).format({
          'application/json': () => {
            res.send(newCustomer);
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

const customerController = new CustomerController();

export { customerController };