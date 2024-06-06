const { Router } = require("express");
const Pedido = require("../database/pedido");

const router = Router();


router.get("/pedido", async (req, res) => {
    const { id } = req.params;
    const pedidosCliente = await Pedido.findAll()

    try {
        if (pedidosCliente) {
            res.send(pedidosCliente);
        }
    } catch (error) {
        res.send({ error: error });
    }

})
router.post("/novoPedido", async (req, res) => {
    const { nomeProdutoPedido, precoProdutoPedido } = req.body
    const novoPedio = await Pedido.create({ nomeProdutoPedido, precoProdutoPedido })

    try {
        if (novoPedio) {
            res.send(novoPedio);
        }
    } catch (error) {
        res.send({ error: error });
    }

})
router.put("/adicinarQtoPedido/:id", async (req, res) => {
    const { id } = req.params;

    const { quantidade } = req.body
    const novoPedio = await Pedido.findByPk(id);
    await novoPedio.update({ quantidade })
    try {
        if (novoPedio) {
            res.send(novoPedio);
        }
    } catch (error) {
        res.send({ error: error });
    }

})
router.put("/adicinarEnderecoId/:id", async (req, res) => {
    const { id } = req.params;

    const { enderecoId } = req.body
    const novoPedio = await Pedido.findByPk(id);
    await novoPedio.update({ enderecoId })
    try {
        if (novoPedio) {
            res.send(novoPedio);
        }
    } catch (error) {
        res.send({ error: error });
    }

})
router.delete("/deletarPedido/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }

        await pedido.destroy();

        return res.status(204).send(); // Retorna uma resposta de sucesso sem conteúdo
    } catch (error) {
        console.error('Erro ao excluir o pedido:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
module.exports = router;