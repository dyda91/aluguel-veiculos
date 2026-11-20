Sistema de Aluguel de Veículos — Backend
API desenvolvida com Node.js, TypeScript, Express, Sequelize e MySQL para estudo de serviços de gestão de locação de veículos.
Tecnologias
- Node.js e TypeScript
- Express
- Sequelize e MySQL
- JWT e bcrypt
- Helmet, CORS e Morgan
Organização
A aplicação contém módulos de rotas, controladores, serviços, repositórios e infraestrutura de banco de dados. Há rotas dedicadas a clientes, funcionários, categorias e veículos, locações, situações de locação e autenticação.
src/
├── app/
│   ├── controllers/
│   ├── errors/
│   ├── helpers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/Sistema de Aluguel de Veículos — Backend
API desenvolvida com Node.js, TypeScript, Express, Sequelize e MySQL para estudo de serviços de gestão de locação de veículos.
Tecnologias
- Node.js e TypeScript
- Express
- Sequelize e MySQL
- JWT e bcrypt
- Helmet, CORS e Morgan
Organização
A aplicação contém módulos de rotas, controladores, serviços, repositórios e infraestrutura de banco de dados. Há rotas dedicadas a clientes, funcionários, categorias e veículos, locações, situações de locação e autenticação.
src/
├── app/
│   ├── controllers/
│   ├── errors/
│   ├── helpers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── views/
├── infra/
└── app.ts
Como executar localmente
Pré-requisitos: Node.js, npm e MySQL configurado.
1. Clone o repositório e entre na pasta do projeto.
2. Instale as dependências: npm install.
3. Copie .env.example para .env e configure PORT, as variáveis DB_* e os segredos necessários, com valores próprios.
4. Configure o banco de dados conforme as definições do projeto.
5. Inicie em desenvolvimento: npm run dev (script configurado com Nodemon).
Não publique seu .env. Não use credenciais reais nos exemplos ou nos commits.

Estado e limitações
Projeto de estudo/portfólio. O script npm test ainda não executa uma suíte real; testes automatizados e instruções de migração do banco devem ser validados antes de tratar a aplicação como pronta para produção.
Evoluções recomendadas
- Adicionar testes automatizados de rotas, serviços e regras de negócio.
- Documentar endpoints com exemplos de requisições e respostas.
- Configurar integração contínua para lint, build e testes.
- Revisar controles de acesso, validação e proteção de informações pessoais.
│   └── views/
├── infra/
└── app.ts
Como executar localmente
Pré-requisitos: Node.js, npm e MySQL configurado.
1. Clone o repositório e entre na pasta do projeto.
2. Instale as dependências: npm install.
3. Copie .env.example para .env e configure PORT, as variáveis DB_* e os segredos necessários, com valores próprios.
4. Configure o banco de dados conforme as definições do projeto.
5. Inicie em desenvolvimento: npm run dev (script configurado com Nodemon).
Não publique seu .env. Não use credenciais reais nos exemplos ou nos commits.

Estado e limitações
Projeto de estudo/portfólio. O script npm test ainda não executa uma suíte real; testes automatizados e instruções de migração do banco devem ser validados antes de tratar a aplicação como pronta para produção.
Evoluções recomendadas
- Adicionar testes automatizados de rotas, serviços e regras de negócio.
- Documentar endpoints com exemplos de requisições e respostas.
- Configurar integração contínua para lint, build e testes.
- Revisar controles de acesso, validação e proteção de informações pessoais.
