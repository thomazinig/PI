const { DataTypes } = require("sequelize");
const { connection } = require("./db");
const Clientes = require("./cliente");

const Pedido = connection.define("pedido", {
 
  nomeProdutoPedido:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  precoProdutoPedido:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  quantidade:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  enderecoId:{
    type:DataTypes.STRING,
    allowNull:true,

  },
  formaPagamento:{
    type:DataTypes.STRING,
  },
  frete:{
    type:DataTypes.STRING,
    allowNull:true,

  },
  status:{
    type: DataTypes.STRING,
    allowNull:true,

  }
});
Pedido.belongsTo(Clientes,{
  constraints:true,
})
Clientes.hasMany(Pedido)

module.exports = Pedido
