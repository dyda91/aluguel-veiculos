import jwt from 'jsonwebtoken';
import { encrypt } from "../helpers/cryptHelper";
import { customerRepository } from '../../infra/db/sequelize/repositories/customerRepository';
import { employeeRepository } from '../../infra/db/sequelize/repositories/employeeRepository';

interface LoginRequest {
  email: string,
  password: string
}

class LoginService {
  async signInCustomer({ email, password }: LoginRequest) {
    const passwordProvided = encrypt(password)
    const customer = await customerRepository.findByEmail(email);

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

  async signInEmployee({ email, password }: LoginRequest) {
    const passwordProvided = encrypt(password);
    const employee = await employeeRepository.findByEmail(email);

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