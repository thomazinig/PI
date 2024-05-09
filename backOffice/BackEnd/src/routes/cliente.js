const { Router } = require("express");
const Clientes = require("../database/cliente");
const router = Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const enderecoCobranca = require("../database/enderecoCobranca");

router.get("/cliente/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Clientes.findOne({ where: { id: id } });

        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        res.json(cliente);
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

router.post("/novoCliente", async (req, res) => {
    const { nome, cpf, idade, genero, senha, email, enderecoCobrancaData } = req.body;
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);
    const validarEmail = await Clientes.findOne({ where: { email: email } })
    const validarCpf = await Clientes.findOne({ where: { cpf: cpf } })
    if (validarCpf && validarEmail) {
        return res.status(400).json({ menssage: "cpf e email já cadastrado" })
    }
    if (validarCpf) {
        return res.status(400).json({ menssage: "cpf já cadastrado" })
    }
    if (validarEmail) {
        return res.status(400).json({ menssage: "Email já cadastrado" })
    }

    try {
        // Crie o cliente
        const novoCliente = await Clientes.create({
            senha: passwordHash,
            nome,
            cpf,
            idade,
            genero,
            email
        });

        // Crie o endereço de cobrança associado ao cliente criado
        const novoEnderecoCobranca = await enderecoCobranca.create({
            endereco: enderecoCobrancaData.endereco,
            cep: enderecoCobrancaData.cep,
            bairro: enderecoCobrancaData.bairro,
            uf: enderecoCobrancaData.uf,
            numero: enderecoCobrancaData.numero,
            complemento: enderecoCobrancaData.complemento,
            cidade: enderecoCobrancaData.cidade,
            clienteId: novoCliente.id // Associa o endereço ao cliente criado
        });
        res.send(novoCliente);
    } catch (error) {

        res.status(400).send({ message: "Erro ao cadastrar cliente" })
    }


})
router.post("/loginStore", async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifique se o cliente com o email fornecido existe
        const cliente = await Clientes.findOne({ where: { email: email } });

        // Se não houver cliente com esse email, retorne um erro
        if (!cliente) {
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        // Verifique se a senha fornecida corresponde à senha armazenada no banco de dados
        const senhaValida = await bcrypt.compare(senha, cliente.senha);

        // Se a senha não for válida, retorne um erro
        if (!senhaValida) {
            return res.status(400).json({ message: "Credenciais inválidas" });
        }
        const secret = process.env.SECRET;

        const token = jwt.sign(
            {
                id: cliente.id,
            },
            secret,
            { expiresIn: 6000 }
        );
        const idUser = cliente.id

        // Se as credenciais estiverem corretas, retorne o cliente
        res.status(200).json({ message: "Autenticação realizada com sucesso!", token, idUser});

    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});
router.put("/editarCliente/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, idade, genero, senha, email, enderecoCobrancaData } = req.body;

    try {
        // Verifique se o cliente a ser editado existe
        const cliente = await Clientes.findOne({ where: { id: id } });

        // Se o cliente não existir, retorne um erro
        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        // Atualize os dados do cliente
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(senha, salt);
        await cliente.update({
            nome: nome,
            cpf: cpf,
            idade: idade,
            genero: genero,
            senha: passwordHash,
            email: email
        });

        // Verifique se o cliente possui um endereço de cobrança
        let enderecoCobrancaCliente = await enderecoCobranca.findOne({ where: { clienteId: cliente.id } });

        // Se o cliente não possuir um endereço de cobrança, crie um novo
        if (!enderecoCobrancaCliente) {
            enderecoCobrancaCliente = await enderecoCobranca.create({
                endereco: enderecoCobrancaData.endereco,
                cep: enderecoCobrancaData.cep,
                bairro: enderecoCobrancaData.bairro,
                uf: enderecoCobrancaData.uf,
                numero: enderecoCobrancaData.numero,
                complemento: enderecoCobrancaData.complemento,
                cidade: enderecoCobrancaData.cidade,
                clienteId: cliente.id
            });
        } else {
            // Se o cliente já possuir um endereço de cobrança, atualize os dados do endereço
            await enderecoCobrancaCliente.update({
                endereco: enderecoCobrancaData.endereco,
                cep: enderecoCobrancaData.cep,
                bairro: enderecoCobrancaData.bairro,
                uf: enderecoCobrancaData.uf,
                numero: enderecoCobrancaData.numero,
                complemento: enderecoCobrancaData.complemento,
                cidade: enderecoCobrancaData.cidade
            });
        }

        // Retorne o cliente atualizado como resposta
        res.json(cliente);
    } catch (error) {
        console.error('Erro ao editar cliente:', error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});
module.exports = router