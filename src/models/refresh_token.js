'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Refresh_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Refresh_token.init({
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    type: DataTypes.STRING,
    createdAt: {
      field: 'createdAt', // Specify the column name
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }, 
    updatedAt: {
      field: 'updatedAt', // Specify the column name
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'Refresh_token',
    tableName: 'Refresh_tokens'
  });
  return Refresh_token;
};