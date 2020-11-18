'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product)
      User.belongsToMany(models.Product, {through: models.Cart})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: 'Email is required!'
        },
        isEmail:{
          args: true,
          msg: 'Please use email format!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: 'Password is required!'
        },
        len:{
          args:[6],
          msg: 'Password length minimal 6 characters!'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options)=>{
    if(!instance.role){
      instance.role = 'customer'
    }
    instance.password = hashPassword(instance.password) 
  })
  return User;
};