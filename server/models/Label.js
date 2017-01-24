import Sequelize from 'sequelize';
import db from '../db';

const Label = db.define('label', {
  name: {
    type: Sequelize.STRING,
     allowNull: false
    // field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  }
});

Label.sync(
    // {force: true}
).then(function () {

});
export default Label;
