"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var PORT = 3000;
app.use(express_1.default.json());
// Configuração de outras middlewares, se necessário
// Usando as rotas definidas no arquivo routes.ts
app.use('/api', routes_1.default);
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
