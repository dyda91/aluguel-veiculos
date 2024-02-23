import { employeeRepository } from '../../infra/db/sequelize/repositories/employeeRepository';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../helpers/cryptHelper';
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

class EmployeeService {

  async findAll() {
    const employee = await employeeRepository.findAll();
    return employee
  }

  async findById(id: string) {
    const employee = await employeeRepository.findById(id);
    return employee
  }

  async findByEmail(email: string) {
    const employee = await employeeRepository.findByEmail(email);
    return employee
  }

  async findByCpf(cpf: string) {
    const cpfCripto = bcrypt.hashSync(cpf, 11);
    const employee = await employeeRepository.findByCpf(cpfCripto);
    return employee
  }

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

  async passwordUpdate(customerId: string, newPassword: string, confirmNewPassword: string) {
    const encryptNewPassword = encrypt(newPassword);
    const encryptConfirmNewPassword = encrypt(confirmNewPassword);

    if (encryptNewPassword === encryptConfirmNewPassword) {
      const employeeUpdate = await employeeRepository.findById(customerId);

      if (employeeUpdate) {
        (await employeeUpdate).password = encryptConfirmNewPassword;
        employeeRepository.passwordUpdate(employeeUpdate, encryptNewPassword, encryptConfirmNewPassword);
        return employeeUpdate;
      }
    }
  }
}

const employeeService = new EmployeeService();

export { employeeService };