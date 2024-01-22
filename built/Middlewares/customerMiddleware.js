"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customerMiddleware = function (req, res, next) {
    var apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== 'sua_chave_api') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
exports.default = customerMiddleware;
