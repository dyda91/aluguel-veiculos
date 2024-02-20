import { customerRepository } from '../../infra/db/sequelize/repositories/customerRepository';
import { Customer, LicenseCategory } from '../../infra/db/sequelize/models/customer';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../helpers/cryptHelper';
import bcrypt from 'bcrypt';

class CustomerService {
  findAll() {
    return customerRepository.findAll();
  }

  findById(customerId: string) {
    return customerRepository.findById(customerId);
  }

  findByEmail(email: string) {
    return customerRepository.findByEmail(email);
  }

  create(
    name: string,
    cpf: string,
    email: string,
    password: string,
    phone: string,
    licenseCategory: LicenseCategory
  ) {
    const encryptPassword = encrypt(password);
    const cpf_Cripto = bcrypt.hashSync(cpf, 11)
    const newCustomer: Customer = {
      id: uuidv4(),
      name,
      cpf: cpf_Cripto,
      email,
      password: encryptPassword,
      phone,
      licenseCategory
    };
    customerRepository.create(newCustomer);
    return newCustomer;
  }

  passwordUpdate(customerId: string, newPassword: string, confirmNewPassword: string) {
    const encryptNewPassword = encrypt(newPassword);
    const encryptConfirmNewPassword = encrypt(confirmNewPassword);
    
    if (encryptNewPassword === encryptConfirmNewPassword) {
      const customerUpdate = customerRepository.findById(customerId);

      if (customerUpdate) {
        customerUpdate.password = encryptConfirmNewPassword;
        customerRepository.updatePassword(customerUpdate, encryptNewPassword, encryptConfirmNewPassword);
        return customerUpdate;
      }
    }
  }
}

const customerService = new CustomerService();

export { customerService };