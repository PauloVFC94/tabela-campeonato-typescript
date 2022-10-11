'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
      },
      teamName: {
        type: Sequelize.STRING,
        field: 'team_name',
        allowNull: false,
      }
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('teams');
  }
};
