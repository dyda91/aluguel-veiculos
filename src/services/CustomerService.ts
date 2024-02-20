import { customerRepository } from '../repositories/CustomerRepository';
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

  getCustomerByEmail(email: string) {
    return customerRepository.getCustomerByEmail(email);
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

  passwordCustomerUpdate(customerId: string, newPassword: string, confirmNewPassword: string) {
    const encryptNewPassword = encrypt(newPassword);
    const encryptConfirmNewPassword = encrypt(confirmNewPassword);
    
    if (encryptNewPassword === encryptConfirmNewPassword) {
      const customerUpdate = customerRepository.getCustomerById(customerId);

      if (customerUpdate) {
        customerUpdate.password = encryptConfirmNewPassword;
        customerRepository.updatePasswordCustomer(customerUpdate, encryptNewPassword, encryptConfirmNewPassword);
        return customerUpdate;
      }
    }
  }
}

const customerService = new CustomerService();

export { customerService };