'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Testimonial.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Testimonial.init({
    userId: DataTypes.INTEGER,
    testimonial_img: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdAt', // Specify the database column name
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedAt', // Specify the database column name
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
  }, {
    sequelize,
    tableName: 'Testimonials',
    modelName: 'Testimonial',
  });
  return Testimonial;
};