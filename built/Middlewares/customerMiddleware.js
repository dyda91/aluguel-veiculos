"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customerMiddleware = function (req, res, next) {
    // Exemplo de verificação de um cabeçalho específico (pode ser adaptado conforme sua necessidade)
    var apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== 'sua_chave_api') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Passe para a próxima função de middleware ou rota
    next();
};
exports.default = customerMiddleware;
