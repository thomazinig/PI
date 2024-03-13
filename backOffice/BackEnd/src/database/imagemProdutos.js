const { DataTypes } = require("sequelize");
const { connection } = require("./db");
const Produtos = require("./produtos");

const ImagemProduto = connection.define("imagemProduto", {
  nomeImagem: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
ImagemProduto.belongsTo(Produtos,{
    constraints:true,
})
Produtos.hasMany(ImagemProduto)

module.exports = ImagemProduto;
