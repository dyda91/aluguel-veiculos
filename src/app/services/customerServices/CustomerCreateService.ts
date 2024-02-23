import { customerRepository } from '../../../infra/db/sequelize/repositories/customerRepository';
import { encrypt } from '../../helpers/cryptHelper';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export interface CustomerRequest {
    id: string,
    name: string,
    cpf: string,
    email: string,
    password: string,
    phone: string,
    licenseCategory: string
}

class CustomerCreateService {
    async create({
        name,
        cpf,
        email,
        password,
        phone,
        licenseCategory
    }): Promise<CustomerRequest> {
        const encryptPassword = encrypt(password);
        const cpf_Cripto = bcrypt.hashSync(cpf, 11)
        const newCustomer = {
            id: uuidv4(),
            name,
            cpf: cpf_Cripto,
            email,
            password: encryptPassword,
            phone,
            licenseCategory
        };
        await customerRepository.create(newCustomer);
        return newCustomer;
    }
}

const customerCreateService = new CustomerCreateService();

export {customerCreateService}