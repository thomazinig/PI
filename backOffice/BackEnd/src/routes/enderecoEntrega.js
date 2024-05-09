const { Router } = require("express");
const enderecosEntrega = require("../database/enderecoEntrega");
const { route } = require("./cliente");
const router = Router();

router.get("/listarEndereco/:clienteId", async (req, res) => {
    const { clienteId } = req.params;
    try {
        const enderecos = await enderecosEntrega.findAll({ where: { clienteId: clienteId } })

        res.send(enderecos)
    } catch (error) {
        res.status(400).send({ message: "Erro ao listar endereços" })
    }
})
router.post("/cadastrarEnederecoEntrega/:clienteId", async (req, res) => {
    const { clienteId } = req.params
    const { endereco, cep, bairro, uf, numero, complemento, cidade } = req.body

    try {
        const novoEnderecoEntrega = await enderecosEntrega.create({
            clienteId, endereco, cep, bairro, uf, numero, complemento, cidade
        })

        res.send(novoEnderecoEntrega)
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Erro ao cadastrar novo endereço" })

    }
})
router.post("/editarEnederecoEntrega/:id/:clienteId", async (req, res) => {
    const { clienteId, id } = req.params
    const { endereco, cep, bairro, uf, numero, complemento, cidade } = req.body


    try {
        const enderecoEntrega = await enderecosEntrega.findOne({ where: { clienteId: clienteId, id: id } })
        await enderecoEntrega.update({
            endereco, cep, bairro, uf, numero, complemento, cidade
        })
        res.send(enderecoEntrega)
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Erro ao editar novo endereço" })

    }
})
router.delete("/excluirEnderecoEntrega/:id/:clienteId", async (req, res) => {
    const { clienteId, id } = req.params
    try {
        const enderecoEntrega = await enderecosEntrega.findOne({ where: { clienteId: clienteId, id: id } })
        await enderecoEntrega.destroy();

        res.send({ menssage: "endereço excluido" })
    } catch (error) {
        res.status(400).send({ message: "Erro ao deletar endereço" })

    }

})
module.exports = router