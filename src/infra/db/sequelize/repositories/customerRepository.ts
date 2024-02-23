import { ICustomerRepository, ICustomer } from '../../../../app/repositories/customerRepository';
import { Customer } from '../models/customer';
import bcrypt from 'bcrypt';
import { LicenseCategory } from '../models/licenseCategory';

class CustomerRepository implements ICustomerRepository {
  async findAll(): Promise<ICustomer[]> {
    const customer = await Customer.findAll();
    return customer.map(item => {
      return {
        id: item.dataValues.id,
        name: item.dataValues.name,
        cpf: item.dataValues.cpf,
        email: item.dataValues.email,
        password: item.dataValues.password,
        phone: item.dataValues.phone,
        licenseCategory: item.dataValues.licenseCategory
      }
    });
  }

  async findById(customerId: string): Promise<ICustomer> {
    const customer = await Customer.findByPk(customerId);
    if (customer) {
      return {
        id: customer.dataValues.id,
        name: customer.dataValues.name,
        cpf: customer.dataValues.cpf,
        email: customer.dataValues.email,
        password: customer.dataValues.password,
        phone: customer.dataValues.phone,
        licenseCategory: customer.dataValues.licenseCategory
      };
    } else {
      return null
    }
  }

  async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = await Customer.findOne({ where: { email: email } });
    if (customer) {
      return {
        id: customer.dataValues.id,
        name: customer.dataValues.name,
        cpf: customer.dataValues.cpf,
        email: customer.dataValues.email,
        password: customer.dataValues.password,
        phone: customer.dataValues.phone,
        licenseCategory: customer.dataValues.licenseCategory,
      }
    } else {
      return null;
    }
  }

  async findByCpf(cpf: string): Promise<ICustomer | null> {
    const customer = (await customerRepository.findAll()).find(emp => {
      const compareCpf = bcrypt.compare(cpf, emp.cpf);
      if (compareCpf) {
        return emp;
      }
    });
    if (customer) {
      return {
        id: customer.id,
        name: customer.name,
        cpf: customer.cpf,
        email: customer.email,
        password: customer.password,
        phone: customer.phone,
        licenseCategory: customer.licenseCategory,
      }
    } else {
      return null;
    }
  }

  async create(data: ICustomer): Promise<void> {
    const customer = await Customer.create({
      id: data.id,
      name: data.name,
      cpf: data.cpf,
      email: data.email,
      password: data.password,
      phone: data.phone,
      licenseCategory: data.licenseCategory
    });
  }

  async passwordUpdate(customer: ICustomer, newPassword: string, confirmNewPassword: string): Promise<void> {
    if (newPassword === confirmNewPassword) {
      const customerUpdate = await this.findById(customer.id);

      if (customerUpdate) {
        customerUpdate.password = confirmNewPassword;

        await this.updateCustomer(customerUpdate);
      }
    }
  }

  private async updateCustomer(updatedCustomer: ICustomer): Promise<void> {
    await Customer.update(
      {
        password: updatedCustomer.password
      },
      {
        where: {
          id: updatedCustomer.id
        }
      }
    );
  }
}

const customerRepository = new CustomerRepository();

export { customerRepository };