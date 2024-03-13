const { Router } = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { create } = require("domain");
const ImagemProduto = require("../database/imagemProdutos");
const Produtos = require("../database/produtos");

const router = Router();


router.post("/novoProduto", async (req, res) => {
    const { nomeProduto, avaliacao, descricao, preco, estoque } = req.body;

    try {
        const novoProduto = Produtos.create({
            nomeProduto, 
            avaliacao,
             descricao, 
             preco, 
             estoque
        })

        res.send(novoProduto)
    } catch (error) {
res.status(400).json({msg:"erro ao cadastrar produto"})
    }

})



router.post('/upload/:id', (req, res) => {
    const { id } = req.params;

    try {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, `${__dirname}/public`);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + ".jpg");
            },
        });

        const upload = multer({ storage: storage }).single("file");

        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).send(err)
            } else if (err) {
                return res.status(500).send(err)
            }
            const fileName = req.file.filename
            console.log(fileName)
            const novo = await ImagemProduto.create(
                {
                    produtoId: id,
                    nomeImagem: fileName,
                }
            )
            return res.status(200).send({ msg: "imagem enviada com sucesso" },)
        })

    } catch (error) {
        console.error('Erro ao enviar imagens:', error);
        res.status(500).json({ error: 'Falha ao enviar imagens' });
    }
});

module.exports = router;