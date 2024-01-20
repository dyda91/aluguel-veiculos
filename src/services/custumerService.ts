import { customerRepository } from '../repositories/customerRepository';
import { Customer, LicenseCategory } from '../models/customerModel';

class CustomerService {
  getAllCustomers() {
    return customerRepository.getAllCustomers();
  }

  getCustomerById(customerId: number) {
    return customerRepository.getCustomerById(customerId);
  }

  createCustomer(customerData: { name: string; email: string; phone: string; licenseCategory: LicenseCategory }): Customer {
    return customerRepository.createCustomer(customerData);
  }
}

const customerService = new CustomerService();

export { customerService };
