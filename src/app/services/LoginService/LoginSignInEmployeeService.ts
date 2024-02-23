import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import { LoginRequest } from './ILoginRequest';
import { encrypt } from "../../helpers/cryptHelper";
import jwt from 'jsonwebtoken';

class LoginSignInEmployeeService {
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

const loginSignInEmployeeService = new LoginSignInEmployeeService();

export { loginSignInEmployeeService }