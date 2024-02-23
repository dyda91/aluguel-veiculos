import { employeePositionRepository } from "../../../infra/db/sequelize/repositories/employeePositionRepository";

class EmployeePositionFindAllService {
    async findAll() {
        const employeePosition = await employeePositionRepository.findAll();
        return employeePosition;
    }
}

const employeePositionFindAllService = new EmployeePositionFindAllService();

export { employeePositionFindAllService }