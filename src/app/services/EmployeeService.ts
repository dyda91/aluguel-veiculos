import { Employee } from '../../infra/db/sequelize/models/employee';
import { LicenseCategory } from '../../infra/db/sequelize/models/customer';
import { EmployeePosition } from '../../infra/db/sequelize/models/employeePosition';
import { employeeRepository } from '../../infra/db/sequelize/repositories/employeeRepository';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../helpers/cryptHelper';
import bcrypt from 'bcrypt';

class EmployeeService {
    getAllEmployees() {
        return employeeRepository.getAllEmployees();
    }

    getEmployeeById(employeeId: string) {
        return employeeRepository.getEmployeeById(employeeId);
    }

    getEmployeeByEmail(email: string) {
        return employeeRepository.getEmployeeByEmail(email);
    }

    createEmployee(
        name: string,
        cpf: string,
        email: string,
        password: string,
        phone: string,
        licenseCategory: LicenseCategory,
        position: EmployeePosition
    ) {
        const encryptPassword = encrypt(password);
        const cpf_Cripto = bcrypt.hashSync(cpf, 11)
        const newEmployee: Employee = {
            id: uuidv4(),
            name,
            cpf: cpf_Cripto,
            email,
            password: encryptPassword,
            phone,
            licenseCategory,
            position
        };
        employeeRepository.createEmployee(newEmployee);
        return newEmployee;
    }

    passwordEmployeeUpdate(employeeId: string, newPassword: string, confirmNewPassword: string) {
        const encryptNewPassword = encrypt(newPassword);
        const encryptConfirmNewPassword = encrypt(confirmNewPassword);
        
        if (encryptNewPassword === encryptConfirmNewPassword) {
          const employeeUpdate = employeeRepository.getEmployeeById(employeeId);
    
          if (employeeUpdate) {
            employeeUpdate.password = encryptConfirmNewPassword;
            employeeRepository.updatePasswordEmployee(employeeUpdate, encryptNewPassword, encryptConfirmNewPassword);
            return employeeUpdate;
          }
        }
      }
}

const employeeService = new EmployeeService();

export { employeeService };