import { employeePositionRepository } from '../../infra/db/sequelize/repositories/employeePositionRepository';
import { v4 as uuidv4 } from 'uuid';

export interface EmployeePositionRequest {
    id: string,
    name: string,
}

class EmployeePositionService {
    async findAll() {
        const employeePosition = await employeePositionRepository.findAll();
        return employeePosition
    }

    async findById(id: string) {
        const employeePosition = await employeePositionRepository.findById(id);
        return employeePosition
    }

    async create({
        name,
    }): Promise<EmployeePositionRequest> {
        const newEmployeePosition = {
            id: uuidv4(),
            name
        };
        await employeePositionRepository.create(newEmployeePosition);
        return newEmployeePosition;
    }
}

const employeePositionService = new EmployeePositionService();

export { employeePositionService };