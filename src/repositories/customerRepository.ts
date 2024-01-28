import { Customer } from '../models/Customer';

class CustomerRepository {
  private customers: Customer[] = [];

  getAllCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(customerId: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === customerId);
  }

  getCustomerByEmail(customerEmail: string): Customer |undefined {
    return this.customers.find((customer) => customer.email === customerEmail);
  }

  getCustomerByPassword(customerPassword: string): Customer |undefined {
    return this.customers.find((customer) => customer.password === customerPassword);
  }

  createCustomer(newCustomer: Customer): Customer {
    this.customers.push(newCustomer);
    console.log(newCustomer)
    return newCustomer;
  }
}

const customerRepository = new CustomerRepository();

export { customerRepository };
