import jwt from 'jsonwebtoken';
import { encrypt } from "../helpers/CryptHelper";
import { Login } from '../models/Login';
import { customerRepository } from '../repositories/CustomerRepository';
import { employeeRepository } from '../repositories/EmployeeRepository';

class LoginService {
  async signInCustomer({ email, password }: Login) {
    const passwordProvided = encrypt(password)
    const customer = await customerRepository.getCustomerByEmail(email);

    if (customer && customer.password === passwordProvided) {
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
  }

  async signInEmployee({ email, password }: Login) {
    const passwordProvided = encrypt(password);
    const employee = await employeeRepository.getEmployeeByEmail(email);

    if (employee && employee.password === passwordProvided) {
      const secret = process.env.JWT_SECRET!;

      const accessToken = jwt.sign(
        {
          id: employee.id,
          name: employee.name,
          email: employee.email,
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