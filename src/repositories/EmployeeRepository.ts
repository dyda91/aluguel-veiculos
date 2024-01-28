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

  getEmployeeByPassword(employeePassword: string): Employee |undefined {
    return this.employees.find((employee) => employee.email === employeePassword);
  }

  createEmployee(newEmployee: Employee): Employee {
    this.employees.push(newEmployee);
    console.log(newEmployee)
    return newEmployee;
  }
}

const employeeRepository = new EmployeeRepository();

export { employeeRepository };