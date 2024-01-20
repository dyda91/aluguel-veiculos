import { Customer, LicenseCategory } from '../models/customerModel';

class CustomerRepository {
  private customers: Customer[] = [];

  getAllCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(customerId: number): Customer | undefined {
    return this.customers.find((customer) => customer.id === customerId);
  }

  createCustomer(customerData: { name: string; email: string; phone: string; licenseCategory: LicenseCategory }): Customer {
    const newCustomerId = this.customers.length + 1;
    const newCustomer = new Customer(newCustomerId, customerData.name, customerData.email, customerData.phone, customerData.licenseCategory);
    this.customers.push(newCustomer);
    return newCustomer;
  }
}

const customerRepository = new CustomerRepository();

export { customerRepository };
