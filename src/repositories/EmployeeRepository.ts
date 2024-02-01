import { encrypt } from '../helpers/CryptHelper';
import { Employee } from '../models/Employee';

class EmployeeRepository {
  private employees: Employee[] = [];

  getAllEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(employeeId: string): Employee | undefined {
    return this.employees.find((employee) => employee.id === employeeId);
  }

  getEmployeeByEmail(employeeEmail: string): Employee |undefined {
    return this.employees.find((employee) => employee.email === employeeEmail);
  }

  createEmployee(newEmployee: Employee): Employee {
    this.employees.push(newEmployee);
    console.log(newEmployee)
    return newEmployee;
  }

  updatePasswordEmployee(employee: Employee, newPassword: string, confirmNewPassword: string): Employee | undefined {
    if (newPassword === confirmNewPassword){
      const employeeUpdate = this.getEmployeeById(employee.id);

      if (employeeUpdate) {
        employeeUpdate.password = confirmNewPassword;

        const updatedEmployee = this.updateEmployee(employeeUpdate);

        return updatedEmployee;
      }
    }
  }

  private updateEmployee(updatedEmployee: Employee): Employee | undefined {
    const index = this.employees.findIndex((employee) => employee.id === updatedEmployee.id);

    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      return updatedEmployee;
    } else {
      return undefined;
    }
  }
}

const employeeRepository = new EmployeeRepository();

export { employeeRepository };