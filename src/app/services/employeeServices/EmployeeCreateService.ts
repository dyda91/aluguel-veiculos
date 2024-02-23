import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import { encrypt } from '../../helpers/cryptHelper';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export interface EmployeeRequest {
  name: string,
  cpf: string,
  email: string,
  password: string,
  phone: string,
  licenseCategory: string
  position: string
}

class EmployeeCreateService {
  async create({
    name,
    cpf,
    email,
    password,
    phone,
    licenseCategory,
    position
  }): Promise<EmployeeRequest> {
    const encryptPassword = encrypt(password);
    const cpfCripto = bcrypt.hashSync(cpf, 11);
    const newEmployee = {
      id: uuidv4(),
      name,
      cpf: cpfCripto,
      email,
      password: encryptPassword,
      phone,
      licenseCategory,
      position
    };
    await employeeRepository.create(newEmployee);
    return newEmployee;
  }
}

const employeeCreateService = new EmployeeCreateService();

export { employeeCreateService };