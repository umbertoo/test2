'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.changeColumn(
        'Notes',
        'text',
        {
          type: Sequelize.TEXT
        }
    );

  },

  down: function (queryInterface, Sequelize) {
    /*
     Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */

    return queryInterface.changeColumn(
        'Notes',
        'text',
        {
          type: Sequelize.STRING
        }
    );

  }
};
