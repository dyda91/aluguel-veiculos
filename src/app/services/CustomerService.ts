import { customerRepository } from '../../infra/db/sequelize/repositories/customerRepository';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../helpers/cryptHelper';
import bcrypt from 'bcrypt';

export interface CustomerRequest {
  id: string,
  name: string,
  cpf: string,
  email: string,
  password: string,
  phone: string,
  licenseCategory: string
}

class CustomerService {
  async findAll() {
    const customers = await customerRepository.findAll();
    return customers
  }

  async findById(id: string) {
    const customer = await customerRepository.findById(id);
    return customer
  }

  async findByEmail(email: string) {
    const customer = await customerRepository.findByEmail(email);
    return customer
  }

  async findByCpf(cpf: string) {
    const cpfCripto = bcrypt.hashSync(cpf, 11);
    const customer = await customerRepository.findByCpf(cpfCripto);
    return customer
  }

  async create({
    name,
    cpf,
    email,
    password,
    phone,
    licenseCategory
  }): Promise<CustomerRequest> {
    const encryptPassword = encrypt(password);
    const cpf_Cripto = bcrypt.hashSync(cpf, 11)
    const newCustomer = {
      id: uuidv4(),
      name,
      cpf: cpf_Cripto,
      email,
      password: encryptPassword,
      phone,
      licenseCategory
    };
    await customerRepository.create(newCustomer);
    return newCustomer;
  }

  async passwordUpdate(customerId: string, newPassword: string, confirmNewPassword: string) {
    const encryptNewPassword = encrypt(newPassword);
    const encryptConfirmNewPassword = encrypt(confirmNewPassword);

    if (encryptNewPassword === encryptConfirmNewPassword) {
      const customerUpdate = await customerRepository.findById(customerId);

      if (customerUpdate) {
        (await customerUpdate).password = encryptConfirmNewPassword;
        customerRepository.passwordUpdate(customerUpdate, encryptNewPassword, encryptConfirmNewPassword);
        return customerUpdate;
      }
    }
  }
}

const customerService = new CustomerService();

export { customerService };