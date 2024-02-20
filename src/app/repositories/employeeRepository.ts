export interface IEmployee {
    id: string;
    name: string;
    cpf: string;
    email: string;
    password: string;
    phone: string;
    licenseCategory: string;
    position: string;
}

export interface IEmployeeRepository {
    findAll(): Promise<IEmployee[]>;
    findById(id: string): Promise<IEmployee | null>;
    findByEmail(id: string): Promise<IEmployee | null>;
    create(data: IEmployee): Promise<void>;
    passwordUpdate(customerId: IEmployee, newPassword: string, confirmNewPassword: string): Promise<void>;
}