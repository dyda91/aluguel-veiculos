import { employeeRepository } from "../../../infra/db/sequelize/repositories/employeeRepository";

class EmployeeFindByIdService {
    async findById(id: string) {
        const employee = await employeeRepository.findById(id);
        return employee
    }
}

const employeeFindByIdService = new EmployeeFindByIdService()

export { employeeFindByIdService }