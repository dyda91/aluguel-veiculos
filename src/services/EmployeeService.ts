import { Employee } from '../models/Employee';
import { LicenseCategory } from '../models/Customer';
import { EmployeePosition } from '../models/enums/EmployeePosition';
import { employeeRepository } from '../repositories/EmployeeRepository';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../helpers/CryptHelper';
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