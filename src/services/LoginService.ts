import jwt from 'jsonwebtoken';
import { encrypt } from "../helpers/CryptHelper";
import { AppError } from '../errors/AppError';
import { customerRepository } from '../repositories/customerRepository';
import { Login } from '../models/Login';

class LoginCustomerService{
    signIn({ email, password }: Login) {
        const customer = customerRepository.getCustomerByEmail(email);
    
        if (!customer) {
          throw new AppError('Email ou Senha inválidos');
        }
    
        const passwordProvided = encrypt(password);
        if (customer.password !== passwordProvided) {
          throw new AppError('Email ou Senha inválidos');
        }
    
        const secret = process.env.JWT_SECRET!;
    
        const accessToken = jwt.sign(
          { id: customer.id, nome: customer.name },
          secret,
          { expiresIn: '1d' }
        );
    
        return  { accessToken };
      }

}

const loginCustomerService = new LoginCustomerService();

export { loginCustomerService }