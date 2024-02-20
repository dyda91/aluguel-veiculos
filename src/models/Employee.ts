import { LicenseCategory } from "./Customer";
import { EmployeePosition } from "./enums/EmployeePosition";

class Employee {
    id: string;
    name: string;
    cpf: string;
    email: string;
    password: string
    phone: string;
    licenseCategory: LicenseCategory;
    position: EmployeePosition;

    constructor(
        id: string,
        name: string,
        cpf: string,
        email: string,
        password: string,
        phone: string,
        licenseCategory: LicenseCategory,
        position: EmployeePosition,
    ){
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.licenseCategory = licenseCategory;
        this.position = position;
    }
}

export { Employee };