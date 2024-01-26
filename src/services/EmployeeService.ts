import { Employee } from '../models/Employee';
import { EmployeePosition } from '../models/enums/EmployeePosition';
import { employeeRepository } from '../repositories/EmployeeRepository';
import { LicenseCategory } from '../models/Customer';
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
}

const employeeService = new EmployeeService();

export { employeeService };