import jwt from 'jsonwebtoken';
import { encrypt } from "../../helpers/cryptHelper";
import { customerRepository } from '../../../infra/db/sequelize/repositories/customerRepository';
import { LoginRequest } from './ILoginRequest';

class LoginSignInCustomerService {
  async signInCustomer({ email, password }: LoginRequest) {
    const passwordProvided = encrypt(password)
    const customer = await customerRepository.findByEmail(email);

    if (customer && customer.password === passwordProvided) {
      const secret = process.env.JWT_SECRET!;

      const accessToken = jwt.sign(
        {
          id: customer.id,
          name: customer.name,
          email: customer.email
        },
        secret,
        { expiresIn: '1d' }
      );

      return { accessToken };
    }
  }
}

const loginSignInCustomerService = new LoginSignInCustomerService();

export { loginSignInCustomerService }