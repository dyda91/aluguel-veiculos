import { employeeRepository } from "../../../infra/db/sequelize/repositories/employeeRepository";

class EmployeeFindAllService {
    async findAll() {
        const employee = await employeeRepository.findAll();
        return employee
    }
}

const employeeFindAllService = new EmployeeFindAllService();

export { employeeFindAllService }