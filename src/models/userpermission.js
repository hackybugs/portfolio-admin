'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class UserPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPermission.belongsTo(models.User,{ foreignKey: 'user_id' });
      UserPermission.belongsTo(models.Module, { foreignKey: 'module_id' });
    }
  }
  UserPermission.init({
    // user_id: DataTypes.INTEGER,
    // module_id: DataTypes.INTEGER,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    module_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Module',
        key: 'id'
      }
    },
    module_name: DataTypes.STRING,
    role: DataTypes.STRING,
    paid: DataTypes.SMALLINT,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt', // Specify the database column name
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt', // Specify the database column name
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'UserPermission',
    tableName:'UserPermissions',
  });
  return UserPermission;
};