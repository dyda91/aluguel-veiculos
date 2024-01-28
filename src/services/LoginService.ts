import jwt from 'jsonwebtoken';
import { encrypt } from "../helpers/CryptHelper";
import { customerRepository } from '../repositories/CustomerRepository';
import { Login } from '../models/Login';
import { employeeRepository } from '../repositories/EmployeeRepository';

class LoginService {
  async signIn({ email, password }: Login) {
    const customer = customerRepository.getCustomerByEmail(email);
    const employee = employeeRepository.getEmployeeByEmail(email);

    const customerPassword = await customerRepository.getAllCustomers().find(
      (customer) => customer.password === encrypt(password)
    );

    const employeePassword = await employeeRepository.getAllEmployees().find(
      (employee) => employee.password === encrypt(password)
    );

    if (customerPassword && customer) {
      const secret = process.env.JWT_SECRET!;

      const accessToken = jwt.sign(
        {
          id: customer.id,
          name: customer.name
        },
        secret,
        { expiresIn: '1d' }
      );

      return { accessToken };
    }

    if (employeePassword && employee) {
      const secret = process.env.JWT_SECRET!;

      const accessToken = jwt.sign(
        {
          id: employee.id,
          name: employee.name,
          position: employee.position
        },
        secret,
        { expiresIn: '8h' }
      );

      return { accessToken };
    }
  }

}

const loginService = new LoginService();

export { loginService }