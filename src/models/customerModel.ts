enum LicenseCategory {
  A = 'A',
  B = 'B',
  AB = 'AB',
}

class Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  licenseCategory: LicenseCategory;

  constructor(id: number, name: string, email: string, phone: string, licenseCategory: LicenseCategory) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.licenseCategory = licenseCategory;
  }
}

export { Customer, LicenseCategory };
