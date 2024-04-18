const { Router } = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ImagemProduto = require("../database/imagemProdutos");
const Produtos = require("../database/produtos");

const router = Router();

router.get("/buscarProduto/:id", async (req, res) => {
    const { id } = req.params;
    const produto = await Produtos.findOne({ where: { id: id } });
    if (!produto) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    res.json(produto)


});
router.get('/download/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Encontra todas as imagens que não são marcadas como principal
        const imagensNaoPrincipais = await ImagemProduto.findAll({
            where: { produtoId: id, principal: false },
            attributes: ['nomeImagem']
        });

        res.status(200).json(imagensNaoPrincipais);
    } catch (error) {
        console.error('Erro ao baixar imagens:', error);
        res.status(500).json({ error: 'Falha ao baixar imagens' });
    }
});

router.get('/download/principal/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Encontra a imagem marcada como principal
        const imagemPrincipal = await ImagemProduto.findOne({
            where: { produtoId: id, principal: true },
            attributes: ['nomeImagem']
        });

        if (imagemPrincipal) {
            res.status(200).json(imagemPrincipal);
        } else {
            res.status(404).json({ error: 'Imagem principal não encontrada para o produto fornecido' });
        }
    } catch (error) {
        console.error('Erro ao baixar imagem principal:', error);
        res.status(500).json({ error: 'Falha ao baixar imagem principal' });
    }
});


router.get("/listarProdutosImagens", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Página atual, padrão é 1
        const limit = parseInt(req.query.limit) || 10; // Número de itens por página, padrão é 10

        const startIndex = (page - 1) * limit; // Índice do primeiro item na página
        const endIndex = page * limit; // Índice do último item na página

        const totalProducts = await Produtos.count(); // Total de produtos

        const totalPages = Math.ceil(totalProducts / limit); // Total de páginas

        const produtos = await Produtos.findAll({
            offset: startIndex,
            limit: limit,
            order: [['id', 'DESC']],
            include: [{
                model: ImagemProduto,
                attributes: ['nomeImagem'],
                required: false,
                order: [['principal', 'DESC'], ['createdAt', 'ASC']], // Ordena pela imagem principal primeiro e depois pela data de criação ascendente
                limit: 1
            }]
        }); // Consulta ao banco de dados

        const result = {
            totalPages: totalPages,
            currentPage: page,
            products: produtos
        };

        res.json(result); // Retorna os dados com informações de paginação
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: "Falha ao buscar produtos" });
    }
});







router.get("/listarProdutos", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Página atual, padrão é 1
        const limit = parseInt(req.query.limit) || 10; // Número de itens por página, padrão é 10

        const startIndex = (page - 1) * limit; // Índice do primeiro item na página
        const endIndex = page * limit; // Índice do último item na página

        const totalProducts = await Produtos.count(); // Total de produtos

        const totalPages = Math.ceil(totalProducts / limit); // Total de páginas

        const produtos = await Produtos.findAll({ offset: startIndex, limit: limit, order: [['id', 'DESC']], }); // Consulta ao banco de dados

        const result = {
            totalPages: totalPages,
            currentPage: page,
            products: produtos
        };

        res.json(result); // Retorna os dados com informações de paginação
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: "Falha ao buscar produtos" });
    }
});


router.get("/listarImagens", async (req, res) => {
    const listarImagem = await ImagemProduto.findAll();
    res.send(listarImagem);

})


router.post("/novoProduto", async (req, res) => {
    const { nomeProduto, avaliacao, descricao, preco, estoque, status } = req.body;

    try {
        const novoProduto = await Produtos.create({
            nomeProduto,
            avaliacao,
            descricao,
            preco,
            estoque,
            status
        })

        res.status(201).send(novoProduto)
    } catch (error) {
        res.status(400).json({ msg: "erro ao cadastrar produto" })
    }

})



router.post('/upload/:id', async (req, res) => {
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
            // Verifica se a imagem é marcada como principal
            const isPrincipal = req.body.principal === 'true';
            console.log(isPrincipal)
             ImagemProduto.create({
                produtoId: id,
                nomeImagem: fileName,
                principal: isPrincipal
            });

            return res.status(200).send({ msg: "imagem enviada com sucesso" });
        });

    } catch (error) {
        console.error('Erro ao enviar imagens:', error);
        res.status(500).json({ error: 'Falha ao enviar imagens' });
    }
});

router.put("/editar/produto/:id", async (req, res, next) => {
    const { id } = req.params;
    const { nomeProduto, descricao, avaliacao, preco, estoque } = req.body;
    const produto = await Produtos.findOne({ where: { id } })
    try {

        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado!" });
        }
        await produto.update({ nomeProduto, descricao, avaliacao, preco, estoque });
        res.status(200).json({ message: "Produto editado." });
    } catch (err) {
        console.error(err);
        next(err);
    }

})


router.put("/edit/status/produto/:id", async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;;

    try {

        const produto = await Produtos.findOne({ where: { id } })
        await produto.update({ status })
        res.status(200).json({ message: "Status editado." });

    } catch {
        console.error(err);
        next(err);

    }
})
router.delete("/deletarImagem/:nomeImagem", async (req, res) => {
    const { nomeImagem } = req.params;
    const imagem = await ImagemProduto.findOne({ where: { nomeImagem } })


    try {
        if (!imagem) {
            return res.status(404).json({ message: 'Imagem não encontrada' });
        }
        await imagem.destroy()

        const diretorioImagens = path.join(__dirname, 'public');
        const caminhoImagem = path.join(diretorioImagens, nomeImagem);

        // Verifica se o arquivo existe antes de tentar excluí-lo
        if (fs.existsSync(caminhoImagem)) {
            // Exclui o arquivo
            fs.unlinkSync(caminhoImagem);
        }

        res.status(200).json({ message: 'Imagem deletada com sucesso' })

    } catch (error) {
        console.error('Erro ao deletar imagem:', error);
        res.status(500).json({ message: 'Erro ao deletar imagem' });
    }


})

module.exports = router;