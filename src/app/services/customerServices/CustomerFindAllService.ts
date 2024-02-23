import { customerRepository } from "../../../infra/db/sequelize/repositories/customerRepository";

class CustomerFindAllService {
    async findAll() {
        const customers = await customerRepository.findAll();
        return customers
    }
}

const customerFindAllService = new CustomerFindAllService();

export { customerFindAllService }