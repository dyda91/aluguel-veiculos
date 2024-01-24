import { customerRepository } from '../repositories/customerRepository';
import { Customer, LicenseCategory } from '../models/Customer';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../helpers/CryptHelper';
import bcrypt from 'bcrypt';

class CustomerService {
  getAllCustomers() {
    return customerRepository.getAllCustomers();
  }

  getCustomerById(customerId: string) {
    return customerRepository.getCustomerById(customerId);
  }

  createCustomer(
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
    customerRepository.createCustomer(newCustomer);
    return newCustomer;
  }
}

const customerService = new CustomerService();

export { customerService };