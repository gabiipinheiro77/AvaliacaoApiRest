# API REST de Missões Espaciais
## 1. Identificação
- **Aluno:** SEU NOME COMPLETO
- **Curso:** NOME DO SEU CURSO
- **Unidade Curricular:** Desenvolver Serviços Web
## 2. Descrição do Projeto
API REST desenvolvida com Node.js e Express para o gerenciamento de missões espaciais. Permite cadastrar, consultar, atualizar e remover missões (CRUD). Os dados ficam em memória, os testes são automatizados e a documentação é interativa via Swagger (OpenAPI 3.0).
## 3. Tecnologias Utilizadas
- Node.js
- Express
- Jest
- Supertest
- Swagger (swagger-ui-express e swagger-jsdoc)
- JSON
## 4. Como Clonar o Projeto
```bash
git clone URL_DO_REPOSITORIO
cd NOME_DO_REPOSITORIO
```
## 5. Como Instalar as Dependências
```bash
npm install
```
## 6. Como Executar o Projeto
```bash
npm start
```
- API: http://localhost:3000
- Documentação Swagger: http://localhost:3000/api-docs
## 7. Como Executar os Testes
```bash
npm test
```
Os testes usam **Jest** e **Supertest** e cobrem:
- `GET /status`, `GET /missoes`, `GET /missoes/{id}`, `POST`, `PUT` e `DELETE`, com cenários de sucesso e de erro (400 e 404);
- verificação do cabeçalho `Content-Type` (JSON);
- independência entre testes (o array de missões é reiniciado com `beforeEach`).
## 8. Documentação dos Endpoints
### GET /status
- **Objetivo:** verificar se a API está funcionando.
- **Resposta:**
```json
{ "status": "ok" }
```
- **Status:** `200 OK`
### GET /missoes
- **Objetivo:** listar todas as missões. Aceita o filtro opcional `?nome=` (busca sem diferenciar maiúsculas de minúsculas).
- **Resposta:**
```json
[
 { "id": 1, "nome": "Apollo 11", "ano": 1969, "agencia": "NASA", "status": true }
]
```
- **Status:** `200 OK`
### GET /missoes/{id}
- **Objetivo:** buscar uma missão pelo ID.
- **Exemplo:** `GET /missoes/1`
- **Resposta:**
```json
{ "id": 1, "nome": "Apollo 11", "ano": 1969, "agencia": "NASA", "status": true }
```
- **Status:** `200 OK`, `404 Not Found`
### POST /missoes
- **Objetivo:** cadastrar uma nova missão.
- **Requisição:**
```json
{ "nome": "Artemis III", "ano": 2027, "agencia": "NASA", "status": false }
```
- **Resposta:**
```json
{ "id": 6, "nome": "Artemis III", "ano": 2027, "agencia": "NASA", "status": false }
```
- **Status:** `201 Created`, `400 Bad Request` (campos obrigatórios ausentes ou inválidos)
### PUT /missoes/{id}
- **Objetivo:** atualizar uma missão existente.
- **Requisição:**
```json
{ "nome": "Artemis III", "ano": 2027, "agencia": "NASA", "status": true }
```
- **Resposta:**
```json
{ "id": 6, "nome": "Artemis III", "ano": 2027, "agencia": "NASA", "status": true }
```
- **Status:** `200 OK`, `400 Bad Request`, `404 Not Found`
### DELETE /missoes/{id}
- **Objetivo:** remover uma missão.
- **Resposta:** sem corpo.
- **Status:** `204 No Content`, `404 Not Found`
### GET /api-docs
- **Objetivo:** exibir a interface do Swagger UI com todos os endpoints documentados.
## 9. Evidências
### Testes automatizados (`npm test`)
![Testes passando](./docs/img/testes.png)
### Swagger UI (`/api-docs`)
![Swagger UI](./docs/img/swagger.png)
## Estrutura de Pastas
```
.
├── src/
│   ├── app.js
│   ├── server.js
│   ├── data/missoes.js
│   ├── routes/missoes.routes.js
│   └── docs/swagger.js
├── tests/
│   └── missoes.test.js
├── .gitignore
├── package.json
└── README.md
```