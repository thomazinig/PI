const { DataTypes } = require("sequelize");
const { connection } = require("./db");
const Clientes = require("./cliente");

const enderecoCobranca = connection.define("enderecosCobranca", {
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep:{
    type:DataTypes.STRING,
    allowNull:false,
    unique: true
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  uf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
Clientes.hasOne(enderecoCobranca);
enderecoCobranca.belongsTo(Clientes);

module.exports = enderecoCobranca;
