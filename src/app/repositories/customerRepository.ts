export interface ICustomer {
    id: string;
    name: string;
    cpf: string;
    email: string;
    password: string;
    phone: string;
    licenseCategory: string;
}

export interface ICustomerRepository {
    findAll(): Promise<ICustomer[]>;
    findById(id: string): Promise<ICustomer | null>;
    findByEmail(email: string): Promise<ICustomer | null>;
    create(data: ICustomer): Promise<void>;
    passwordUpdate(customerId: ICustomer, newPassword: string, confirmNewPassword: string): Promise<void>;
}