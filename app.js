import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

import swaggerUi from "swagger-ui-express";
import swaggerSpec from './swagger.js';

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const missao = [
    {
        "id": 1,
        "nome": "Apollo 11",
        "ano": 1969,
        "agencia": "NASA",
        "status": "Concluída"

    },
    {
        "id": 2,
        "nome": "Voyager 1",
        "ano": 1977,
        "agencia": "NASA",
        "status": "Em operação"
    },
    {
        "id": 3,
        "nome": "Artemis II",
        "ano": 2026,
        "agencia": "NASA",
        "status": "Planejada"
    },
    {
        "id": 4,
        "nome": "Abigail",
        "ano": 2022,
        "agencia": "NASA",
        "status": "Planejada"
    },
    {
        "id": 5,
        "nome": "juninho Céu",
        "ano": 2030,
        "agencia": "NASA",
        "status": "Planejada"
    }

]
/**
 * @openapi
 * /missao:
 *   get:
 *     summary: Lista missao
 *     description: Retorna a lista de missao, com filtro opcional por nome
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra as missões pelo nome
 *     responses:
 *       200:
 *         description: Lista de missões retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   ano:
 *                     type: integer
 *                  agencia:
 *                      type: string
 *                  status:
 *                      type: string
 *                  example: Concluida
 */
app.get('/missao', (req, res) => {

    const nome = req.query?.nome || null
    let missaoFiltradas = null
    if (nome !== null) {
        missaoFiltradas = missao.filter(item => item.nome.toLowerCase()
            .includes(titulo.toLowerCase()));

    }

    missaoFiltradas = missaoFiltradas ?? missaos;
    res.status(200).json(missaoFiltradas);
});

/**
 * @openapi
 * /missao/{id}:
 *   get:
 *     summary: Busca uma missao pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Missão encontrada
 *       404:
 *         description: Missão não encontrada
 */

app.get('/missao/:id', (req, res) => {
    const id = Number(req.params?.id);

    const missao = missao.find(item => item.id === id);

    if (!missao) {
        return res.status(404).json({ error: "Missão não encontrada" })
    }

    res.status(200).json(missao);

});
/**
 * @openapi
 * /missao:
 *   post:
 *     summary: Cria uma nova missão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - ano
 *               - agencia
 *             properties:
 *               nome:
 *                 type: string
 *               ano:
 *                 type: integer
 *               agencia:
 *                 type: string
 *               status:
 *                  type: string
 *                example: em preparação
 *     responses:
 *       201:
 *         description: Missão criada com sucesso
 *       400:
 *         description: Dados inválidos
 */


app.post('/missao', (req, res) => {
    const nome = req.body?.nome || null;
    const ano = req.body?.ano || null;
    const agencia = req.body?.agencia || null;

    if (!nome) {
        return res.status(400).json({ error: "Nome é obrigatório" })
    }
    if (!ano) {
        return res.status(400).json({ error: "Ano é obrigatório" })
    }

    if (!agencia) {
        return res.status(400).json({ error: "Agencia é obrigatório" })
    }

    const novaMissao = {
        id: missao.length + 1,
        nome: nome,
        ano: ano,
        agencia: agencia,
        status: req.body?.status || false
    }

    missao.push(novaMissao);

    res.status(201).json(novaMissao);
});
/**
 * @openapi
 * /missao/{id}:
 *   put:
 *     summary: Atualiza uma missão pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *               type: string
 *                 example: maria
 *               ano:
 *                 type: integer
 *                 example: 2028
 *               agencia:
 *                 type: string
 *                  example: nasa
 *               status:
 *                 type: string
 *                 example: concluida
 *     responses:
 *       200:
 *         description: Missão atualizada com sucesso
 *       404:
 *         description: Missão não encontrado
 */

app.put('/missao/:id', (req, res) => {
    const id = Number(req.params.id);
    const missao = missao.find(item => item.id === id);
    if (!missao) {
        return res.status(404).json({ error: "Missão não encontrada" })
    }

    if (req?.body?.nome && req.body.nome !== "") {
        missao.nome = req.body.nome;
    }

    if (req?.body?.ano && req.body.ano !== "") {
        missao.ano = req.body.ano;
    }
    if (req?.body?.agencia && req.body.agencia !== "") {
        missao.agencia = req.body.agencia;
    }

    if (req?.body?.status && req.body.status !== "") {
        missao.status = req.body.status;
    }

    res.status(200).json(missao)
});

/**
 * @openapi
 * /missao/{id}:
 *   delete:
 *     summary: Exclui uma missao pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Missão excluida com sucesso
 *       404:
 *         description: Missão não encontrada
 */
app.delete('/missao/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = missao.findIndex(item => item.id === id)

    if (indice === -1) {
        return res.status(404).json({ error: "Missão não encontrada" })
    }

    missao.splice(indice, 1);

    res.status(204).send('')

});

export default app;