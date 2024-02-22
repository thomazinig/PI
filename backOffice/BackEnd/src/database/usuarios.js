const { DataTypes } = require("sequelize");
const { connection } = require("./db");

const Usuarios = connection.define("usuario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf:{
    type:DataTypes.STRING,
    allowNull:false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grupo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});

module.exports = Usuarios;
