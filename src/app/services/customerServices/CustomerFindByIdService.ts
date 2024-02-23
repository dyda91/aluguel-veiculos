import { customerRepository } from "../../../infra/db/sequelize/repositories/customerRepository";

class CustomerFindByIdService {
    async findById(id: string) {
        const customer = await customerRepository.findById(id);
        return customer
    }
}

const customerFindByIdService = new CustomerFindByIdService();

export { customerFindByIdService }