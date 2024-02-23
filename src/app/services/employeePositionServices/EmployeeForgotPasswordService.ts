import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';

class EmployeeForgotPasswordService {
    async forgotPassword({ email, cpf }) {
        const secret = process.env.JWT_SECRET_2!;
        const employeeCpf = await employeeRepository.findByCpf(cpf)
        const compareCpf = bcrypt.compareSync(cpf, employeeCpf.cpf);
        const emplyoee = await employeeRepository.findByEmail(email);

        if (compareCpf && emplyoee) {
            const token = jwt.sign(
                {
                    id: emplyoee.id,
                    email: emplyoee.email,
                    cpf: emplyoee.cpf,
                    position: emplyoee.position
                },
                secret,
                { expiresIn: '10m' }
            );

            return { token };
        }
    }
}

const employeeForgotPasswordService = new EmployeeForgotPasswordService();

export { employeeForgotPasswordService }