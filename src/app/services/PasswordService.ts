import { customerRepository } from '../../infra/db/sequelize/repositories/customerRepository';
import { employeeRepository } from '../../infra/db/sequelize/repositories/employeeRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class PasswordService {
    async forgotCustomerPassword({ email, cpf }) {
        const secret = process.env.JWT_SECRET_2!;
        const cpfCustomer = await customerRepository.getAllCustomers().find((customer) => bcrypt.compareSync(cpf, customer.cpf));
        const customer = await customerRepository.getCustomerByEmail(email);

        if (cpfCustomer && customer) {
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
        const cpfEmployee = await employeeRepository.getAllEmployees().find((employee) => bcrypt.compareSync(cpf, employee.cpf));
        const emplyoee = await employeeRepository.getEmployeeByEmail(email);

        if (cpfEmployee && emplyoee) {
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