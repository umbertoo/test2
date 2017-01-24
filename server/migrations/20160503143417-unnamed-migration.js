'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.changeColumn(
        'notes',
        'colorId',
        {
            type: Sequelize.INTEGER,
          defaultValue:1
        }
    );

  },

  down: function (queryInterface, Sequelize) {
    /*
     Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */


  }
};