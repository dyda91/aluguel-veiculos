import { customerRepository } from '../../infra/db/sequelize/repositories/customerRepository';
import { employeeRepository } from '../../infra/db/sequelize/repositories/employeeRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class PasswordService {
    async forgotCustomerPassword({ email, cpf }) {
        const secret = process.env.JWT_SECRET_2!;
        const customerCpf = await customerRepository.findByCpf(cpf) 
        const compareCpf = bcrypt.compareSync(cpf, (await customerCpf).cpf);
        const customer = await customerRepository.findByEmail(email);

        if (compareCpf && customer) {
            const token = jwt.sign(
                {
                    id: customer.id,
                    email: customer.email,
                    cpf: customer.cpf
                },
                secret,
                { expiresIn: '10m' }
            );

            return { token };
        }
    }

    async forgotEmployeePassword({ email, cpf }) {
        const secret = process.env.JWT_SECRET_2!;
        const employeeCpf = await employeeRepository.findByCpf(cpf)
        const compareCpf = bcrypt.compareSync(cpf, (await employeeCpf).cpf); 
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

const passwordService = new PasswordService();

export { passwordService }