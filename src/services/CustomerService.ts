import { customerRepository } from '../repositories/CustomerRepository';
import { Customer, LicenseCategory } from '../models/Customer';
import { v4 as uuidv4 } from 'uuid';

class CustomerService {
  getAllCustomers() {
    return customerRepository.getAllCustomers();
  }

  getCustomerById(customerId: string) {
    return customerRepository.getCustomerById(customerId);
  }

  createCustomer(customerData: { 
    name: string; 
    cpf: string; 
    email: string; 
    phone: string; 
    licenseCategory: LicenseCategory
  }): Customer {
    const newCustomer = new Customer(
      uuidv4(),
      customerData.name,
      customerData.cpf,
      customerData.email,
      customerData.phone,
      customerData.licenseCategory
    );
    customerRepository.createCustomer(newCustomer); 
    return newCustomer;
  }
}

const customerService = new CustomerService();

export { customerService };