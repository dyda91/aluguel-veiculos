import { employeePositionRepository } from "../../../infra/db/sequelize/repositories/employeePositionRepository";

class EmployeePositionFindByIdService {
    async findById(id: string) {
        const employeePosition = await employeePositionRepository.findById(id);
        return employeePosition;
    }
}

const employeePositionFindByIdService = new EmployeePositionFindByIdService();

export { employeePositionFindByIdService };