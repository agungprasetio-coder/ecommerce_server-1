'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: 'Name is required!'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: 'Image url is required!'
        },
        isUrl:{
          args: true,
          msg: 'Please use url format!'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate:{
        isPriceUnderZero(value){
          if(value < 0){
            throw new Error(`Price can't under zero!`)
          }
        },
        isInt:{
          args: true,
          msg: 'Price must number!'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate:{
        isStockUnderZero(value){
          if(value < 0){
            throw new Error(`Stock can't under zero!`)
          }
        },
        isInt:{
          args: true,
          msg: 'Stock must number!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};