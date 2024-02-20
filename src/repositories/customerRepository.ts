import { encrypt } from '../helpers/CryptHelper';
import { Customer } from '../models/Customer';

class CustomerRepository {
  private customers: Customer[] = [];

  getAllCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(customerId: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === customerId);
  }

  getCustomerByEmail(customerEmail: string): Customer | undefined {
    return this.customers.find((customer) => customer.email === customerEmail);
  }

  createCustomer(newCustomer: Customer): Customer {
    this.customers.push(newCustomer);
    console.log(newCustomer)
    return newCustomer;
  }

  updatePasswordCustomer(customer: Customer, newPassword: string, confirmNewPassword: string): Customer | undefined {
    if (newPassword === confirmNewPassword) {
      const customerUpdate = this.getCustomerById(customer.id);

      if (customerUpdate) {
        customerUpdate.password = confirmNewPassword;

        const updatedCustomer = this.updateCustomer(customerUpdate);

        return updatedCustomer;
      }
    }
  }

  private updateCustomer(updatedCustomer: Customer): Customer | undefined {
    const index = this.customers.findIndex((customer) => customer.id === updatedCustomer.id);

    if (index !== -1) {
      this.customers[index] = updatedCustomer;
      return updatedCustomer;
    } else {
      return undefined;
    }
  }
}

const customerRepository = new CustomerRepository();

export { customerRepository };
