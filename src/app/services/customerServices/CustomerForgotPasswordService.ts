import { customerRepository } from "../../../infra/db/sequelize/repositories/customerRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class CustomerForgotPasswordService {
    async forgotPassword({ email, cpf }) {
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
}

const customerForgotPasswordService = new CustomerForgotPasswordService();

export { customerForgotPasswordService }