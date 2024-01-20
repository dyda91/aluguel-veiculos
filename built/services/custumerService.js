"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomerService = /** @class */ (function () {
    function CustomerService(customerRepository) {
        this.customerRepository = customerRepository;
    }
    CustomerService.prototype.getAllCustomers = function () {
        return this.customerRepository.getAllCustomers();
    };
    CustomerService.prototype.getCustomerById = function (customerId) {
        return this.customerRepository.getCustomerById(customerId);
    };
    CustomerService.prototype.createCustomer = function (customerData) {
        return this.customerRepository.createCustomer(customerData);
    };
    return CustomerService;
}());
exports.default = CustomerService;
