'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here. 
    */
    await queryInterface.bulkInsert('modules', [{
      name: 'test_model',
      url: '/testemonial',
      status:'active',  
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'test_model1',
      url: '/testemonial1',
      status:'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'test_model2',
      url: '/testemonial2',
      status:'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'test_model3',
      url: '/testemonial3',
      status:'deactive',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('modules', null, {});
  }
};
