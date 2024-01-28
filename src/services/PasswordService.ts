import { customerRepository } from '../repositories/CustomerRepository';
import { employeeRepository } from '../repositories/EmployeeRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class PasswordService {
    async forgotPassword({ email, cpf }) {
        const secret = process.env.JWT_SECRET_2!;

        const cpfEmployee = await employeeRepository.getAllEmployees().find((employee) => bcrypt.compareSync(cpf, employee.cpf));
        const cpfCustomer = await customerRepository.getAllCustomers().find((customer) => bcrypt.compareSync(cpf, customer.cpf));

        const emplyoee = await employeeRepository.getEmployeeByEmail(email)
        const customer = await customerRepository.getCustomerByEmail(email);

        if (cpfCustomer && customer) {
            const token = jwt.sign(
                {
                    email: cpfCustomer.email,
                    cpf: cpfCustomer.cpf
                },
                secret,
                { expiresIn: '10m' }
            );

            return { token };
        }

        if (cpfEmployee && emplyoee) {
            const token = jwt.sign(
                {
                    id: emplyoee.id,
                    email: emplyoee.email,
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