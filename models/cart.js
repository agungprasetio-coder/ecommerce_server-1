'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt:{
          args: true,
          msg: 'Input must number!'
        },
        notNull:{
          args:true,
          msg:'Quantity is required!'
        },
        min:{
          args: 1,
          msg: 'Quantity must higher than 0'
        }
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
  });
  Cart.beforeCreate((instance, options)=>{
    instance.status = false
  })
  return Cart;
};