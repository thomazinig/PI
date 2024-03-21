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
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
  preco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estoque: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});

module.exports = Produtos;
