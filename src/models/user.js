'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations
      User.hasMany(models.Testimonial, {
        foreignKey: 'userId', // Name of the foreign key in Testimonial model
        as: 'testimonials' // Alias to use when accessing the associated testimonials
      });
      User.belongsToMany(models.Module, { through: 'UserPermission' });
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure first name is required
      field: 'first_name', // Specify the database column name
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure last name is required
      field: 'last_name', // Specify the database column name
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure email is required
      unique: true, // Ensure email is unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure password is required
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at', // Specify the database column name
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at', // Specify the database column name
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Use lowercase table name for consistency
  });

  return User;
};
