'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const columns = await queryInterface.describeTable('Users');
      if (!columns.hasOwnProperty('type')) {
        await queryInterface.addColumn('Users', 'type', {
          type: Sequelize.DataTypes.SMALLINT,
          after: 'lastName', // Assuming 'lastName' is an existing column
          defaultValue: 0 // Adding default value of 0
        }, { transaction });
      }
      await transaction.commit();
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Users', 'type', { transaction });
      await transaction.commit();
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error(error);
      throw error;
    }
  }
};
