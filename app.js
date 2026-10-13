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
 *     description: Retorna a lista de missao, com filtro opcional por título
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra as missoes pelo nome
 *     responses:
 *       200:
 *         description: Lista de missoes retornada com sucesso
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
 *                     type: string
 *                   agencia:
 *                     type: string
 *                   status:
 *                     type: boolean
 */

app.get('/missao', (req, res) => {

    const nome = req.query?.nome || null
    let missaoFiltradas = null
    if (nome !== null) {
        missaoFiltradas = missao.filter(item => item.nome.toLowerCase()
            .includes(nome.toLowerCase()));

    }

    missaoFiltradas = missaoFiltradas ?? missao;
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

    const Missao = missao.find(item => item.id === id);

    if (!Missao) {
        return res.status(404).json({ error: "Missão não encontrada" })
    }

    res.status(200).json(Missao);

});
/**
 * @openapi
 * /missao:
 *   post:
 *     summary: Cria uma missao nova
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
 *                 type: string
 *               example: ano 2000
 *               agencia:
 *                     type: string
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Missao criada com sucesso
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
 * /livros/{id}:
 *   put:
 *     summary: Atualiza uma missao pelo id
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
 *                 type: string
 *                 example: Abigail
 *               ano:
 *                 type: string
 *                 example: 2010 ano
 *               agencia:
 *                 type: string
 *                 example: Nasa
 *               status:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Missao atualizada com sucesso
 *       404:
 *         description: Missao não encontrada
 */

app.put('/missao/:id', (req, res) => {
    const id = Number(req.params.id);
    const Missao = missao.find(item => item.id === id);
    if (!Missao) {
        return res.status(404).json({ error: "Missão não encontrada" })
    }

    if (req?.body?.nome && req.body.nome !== "") {
        Missao.nome = req.body.nome;
    }

    if (req?.body?.ano && req.body.ano !== "") {
        Missao.ano = req.body.ano;
    }
    if (req?.body?.agencia && req.body.agencia !== "") {
        Missao.agencia = req.body.agencia;
    }

    if (req?.body?.status && req.body.status !== "") {
        Missao.status = req.body.status;
    }

    res.status(200).json(Missao)
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