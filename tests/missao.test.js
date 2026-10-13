import request from "supertest";
import app from "../app.js";

test("POST /missao cria uma nova missao", async () => {
  const resposta = await request(app).post("/missao")
    .send({ nome: "Apollo 11", ano: 1969, agencia: "NASA" });

  expect(resposta.status).toBe(201);
  expect(resposta.body.nome).toBe("Apollo 11");
});

test("POST /missao retorna erro ao não informar o nome", async () => {
  const resposta = await request(app).post("/missao")
    .send({ nome: "Apollo 11" });

  expect(resposta.status).toBe(400);
  expect(resposta.body.error).toBe("Ano é obrigatório");
});


test("GET /missao  filtra missao pelo nome", async () => {
  const resposta = await request(app).get("/missao")
    .send("nome=apollo 11");

  expect(resposta.status).toBe(200);
  expect(resposta.body[0].nome).toBe("Apollo 11");
});

test("GET /missao duas missões já cadastradas", async () => {
  const resposta = await request(app).get("/missao")
    .send();

  expect(resposta.status).toBe(200);
  expect(resposta.body.length).toBe(6);
});

test("GET /missao filtra por nome sem diferenciar maiúsculas", async () => {
  const resposta = await request(app).get("/missao")
    .query({ "nome": "Voyager 1" });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toHaveLength(1);
  expect(resposta.body[0].nome).toBe("Voyager 1");
});

test("GET /missao retorna lista vazia quando não encontra o nome", async () => {
  const resposta = await request(app).get("/missao")
    .query({ nome: "Missão inexistente" });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toEqual([]);
});

test("GET /missao/:id retorna a missao encontrada", async () => {
  const resposta = await request(app).get("/missao/1");

  expect(resposta.status).toBe(200);
  expect(resposta.body.id).toBe(1);
});

test("GET /missao/:id retorna erro quando o missao não existe", async () => {
  const resposta = await request(app).get("/missao/999");

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "Missão não encontrada" });
});

test("POST /missao retorna erro quando o nome não é informado", async () => {
  const resposta = await request(app).post("/missao")
    .send({ ano: "Ano sem nome" });

  expect(resposta.status).toBe(400);
  expect(resposta.body.error).toBe("Nome é obrigatório");
});

test("POST /missao aceita disponibilidade informada", async () => {
  const resposta = await request(app).post("/missao")
    .send({ nome: "Missão disponível", ano: "Ano", agencia: "Nasa", status: undefined });

  expect(resposta.status).toBe(201);
  expect(resposta.body.disponviel).toBe(undefined);
});

test("POST /missao usa indisponibilidade quando ela não é informada", async () => {
  const resposta = await request(app).post("/missao")
    .send({ nome: "Missão sem disponibilidade", ano: "Novo Ano", agencia: "Nasa", status: undefined });

  expect(resposta.status).toBe(201);
  expect(resposta.body.disponviel).toBe(undefined);
});

test("PUT /missao/:id atualiza os campos informados", async () => {
  const resposta = await request(app).put("/missao/1")
    .send({ nome: "Nome atualizado", ano: "Novo ano", agencia: "Nasa", status: true });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toMatchObject({
    id: 1,
    nome: "Nome atualizado",
    ano: "Novo ano",
    agencia: "Nasa",
    status: true
  });
});

test("PUT /missao/:id preserva os campos quando recebem valores vazios ou falsos", async () => {
  const resposta = await request(app).put("/missao/1")
    .send({ nome: "", ano: "", agencia: "", status: false });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toMatchObject({
    nome: "Nome atualizado",
    ano: "Novo ano",
    agencia: "Nasa",
    status: true
  });
});

test("PUT /missao/:id retorna erro quando o missao não existe", async () => {
  const resposta = await request(app).put("/missao/999")
    .send({ nome: "Nome" });

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "Missão não encontrada" });
});

test("DELETE /missao/:id remove o missao encontrada", async () => {
  const resposta = await request(app).delete("/missao/4");

  expect(resposta.status).toBe(204);
  expect(resposta.body).toEqual({});
});

test("DELETE /missao/:id retorna erro quando o missao não existe", async () => {
  const resposta = await request(app).delete("/missao/999");

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "Missão não encontrada" });
});