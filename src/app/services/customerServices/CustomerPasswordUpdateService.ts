import { customerRepository } from '../../../infra/db/sequelize/repositories/customerRepository';
import { encrypt } from '../../helpers/cryptHelper';

class CustomerPasswordUpdateService {
  async passwordUpdate(customerId: string, newPassword: string, confirmNewPassword: string) {
    const encryptNewPassword = encrypt(newPassword);
    const encryptConfirmNewPassword = encrypt(confirmNewPassword);

    if (encryptNewPassword === encryptConfirmNewPassword) {
      const customerUpdate = await customerRepository.findById(customerId);

      if (customerUpdate) {
        (await customerUpdate).password = encryptConfirmNewPassword;
        customerRepository.passwordUpdate(customerUpdate, encryptNewPassword, encryptConfirmNewPassword);
        return customerUpdate;
      }
    }
  }
}

const customerPasswordUpdateService = new CustomerPasswordUpdateService();

export { customerPasswordUpdateService };