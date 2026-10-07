import request from "supertest";
import app from "../app.js";

test("POST /missao cria uma nova missao", async () => {
  const resposta = await request(app).post("/missao")
    .send({ nome: "Apollo 11", ano: 1969, agencia: "NASA", });

  expect(resposta.status).toBe(201);
  expect(resposta.body.nome).toBe("Apollo 11");
});

test("POST /missao retorna erro ao não informar o nome", async () => {
  const resposta = await request(app).post("/missao")
    .send({ nome: "Apollo 11" });

  expect(resposta.status).toBe(400);
  expect(resposta.body.error).toBe("Nome é obrigatório");
});


test("GET /missao  filtra missao pelo nome", async () => {
  const resposta = await request(app).get("/missao")
    .send("nome=Voyager 1");

  expect(resposta.status).toBe(200);
  expect(resposta.body[0].nome).toBe("Voyager 1");
});

test("GET /missao dois missao já cadastrados", async () => {
  const resposta = await request(app).get("/missao")
    .send();

  expect(resposta.status).toBe(200);
  expect(resposta.body.length).toBe(3);
});

test("GET /missao filtra por título sem diferenciar maiúsculas", async () => {
  const resposta = await request(app).get("/missao")
    .query({  "nome": "Voyager 1" });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toHaveLength(1);
  expect(resposta.body[0].titulo).toBe("Drácula");
});

test("GET /missao retorna lista vazia quando não encontra o título", async () => {
  const resposta = await request(app).get("/missao")
    .query({ titulo: "livro inexistente" });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toEqual([]);
});

test("GET /missao/:id retorna o livro encontrado", async () => {
  const resposta = await request(app).get("/missao/1");

  expect(resposta.status).toBe(200);
  expect(resposta.body.id).toBe(1);
});

test("GET /missao/:id retorna erro quando o livro não existe", async () => {
  const resposta = await request(app).get("/missao/999");

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "livro não encontrado" });
});

test("POST /missao retorna erro quando o título não é informado", async () => {
  const resposta = await request(app).post("/missao")
    .send({ autor: "Autor sem título" });

  expect(resposta.status).toBe(400);
  expect(resposta.body.error).toBe("Título é obrigatório");
});

test("POST /missao aceita disponibilidade informada", async () => {
  const resposta = await request(app).post("/missao")
    .send({ titulo: "Livro disponível", autor: "Autor", disponivel: true });

  expect(resposta.status).toBe(201);
  expect(resposta.body.disponviel).toBe(true);
});

test("POST /missao usa indisponibilidade quando ela não é informada", async () => {
  const resposta = await request(app).post("/missao")
    .send({ titulo: "Livro sem disponibilidade", autor: "Autor", disponivel: false });

  expect(resposta.status).toBe(201);
  expect(resposta.body.disponviel).toBe(false);
});

test("PUT /missao/:id atualiza os campos informados", async () => {
  const resposta = await request(app).put("/missao/1")
    .send({ titulo: "Título atualizado", autor: "Novo autor", disponivel: true });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toMatchObject({
    id: 1,
    titulo: "Título atualizado",
    autor: "Novo autor",
    disponivel: true
  });
});

test("PUT /missao/:id preserva os campos quando recebem valores vazios ou falsos", async () => {
  const resposta = await request(app).put("/missao/1")
    .send({ titulo: "", autor: "", disponivel: false });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toMatchObject({
    titulo: "Título atualizado",
    autor: "Novo autor",
    disponivel: true
  });
});

test("PUT /missao/:id retorna erro quando o livro não existe", async () => {
  const resposta = await request(app).put("/missao/999")
    .send({ titulo: "Título" });

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "Livro não encontrado" });
});

test("DELETE /missao/:id remove o livro encontrado", async () => {
  const resposta = await request(app).delete("/missao/4");

  expect(resposta.status).toBe(204);
  expect(resposta.body).toEqual({});
});

test("DELETE /missao/:id retorna erro quando o livro não existe", async () => {
  const resposta = await request(app).delete("/missao/999");

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "Livro não encontrado" });
});