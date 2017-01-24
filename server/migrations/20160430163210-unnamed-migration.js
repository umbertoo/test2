'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

   return queryInterface.addColumn(
  'Notes',
  'title',
  {
    type: Sequelize.STRING
  }
);

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.removeColumn(  'Notes',
  'title');

  }
};
