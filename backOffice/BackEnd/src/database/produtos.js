const { DataTypes } = require("sequelize");
const { connection } = require("./db");

const Produtos = connection.define("produto", {
  nomeProduto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avaliacao:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estoque: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Produtos;
