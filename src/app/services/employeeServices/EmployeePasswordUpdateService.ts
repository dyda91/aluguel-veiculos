import { employeeRepository } from "../../../infra/db/sequelize/repositories/employeeRepository";
import { encrypt } from "../../helpers/cryptHelper";

class EmployeePasswordUpdateService {
    async passwordUpdate(customerId: string, newPassword: string, confirmNewPassword: string) {
        const encryptNewPassword = encrypt(newPassword);
        const encryptConfirmNewPassword = encrypt(confirmNewPassword);

        if (encryptNewPassword === encryptConfirmNewPassword) {
            const employeeUpdate = await employeeRepository.findById(customerId);

            if (employeeUpdate) {
                (await employeeUpdate).password = encryptConfirmNewPassword;
                employeeRepository.passwordUpdate(employeeUpdate, encryptNewPassword, encryptConfirmNewPassword);
                return employeeUpdate;
            }
        }
    }
}

const employeePasswordUpdateService = new EmployeePasswordUpdateService();

export { employeePasswordUpdateService }