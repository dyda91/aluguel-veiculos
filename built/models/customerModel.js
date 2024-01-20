"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseCategory = exports.Customer = void 0;
var LicenseCategory;
(function (LicenseCategory) {
    LicenseCategory["A"] = "A";
    LicenseCategory["B"] = "B";
    LicenseCategory["AB"] = "AB";
})(LicenseCategory || (exports.LicenseCategory = LicenseCategory = {}));
var Customer = /** @class */ (function () {
    function Customer(id, name, email, phone, licenseCategory) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.licenseCategory = licenseCategory;
    }
    return Customer;
}());
exports.Customer = Customer;
