"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customerModel_1 = require("../models/customerModel");
var CustomerRepository = /** @class */ (function () {
    function CustomerRepository() {
        this.customers = [];
    }
    CustomerRepository.prototype.getAllCustomers = function () {
        return this.customers;
    };
    CustomerRepository.prototype.getCustomerById = function (customerId) {
        return this.customers.find(function (customer) { return customer.id === customerId; });
    };
    CustomerRepository.prototype.createCustomer = function (customerData) {
        var newCustomerId = this.customers.length + 1;
        var newCustomer = new customerModel_1.Customer(newCustomerId, customerData.name, customerData.email, customerData.phone, customerData.licenseCategory);
        this.customers.push(newCustomer);
        return newCustomer;
    };
    return CustomerRepository;
}());
exports.default = CustomerRepository;
