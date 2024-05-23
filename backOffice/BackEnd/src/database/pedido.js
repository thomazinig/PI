const { DataTypes } = require("sequelize");
const { connection } = require("./db");
const Clientes = require("./cliente");

const Pedido = connection.define("pedido", {
  idPedido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  enderecoId:{
    type:DataTypes.STRING,
  },
  formaPagamento:{
    type:DataTypes.STRING,
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});
Pedido.belongsTo(Clientes,{
  constraints:true,
})
Clientes.hasMany(Pedido)

module.exports = Pedido
