import Sequelize from 'sequelize';


const db = new Sequelize('notes_base', 'root', 'gfhfgtn4378');
db.sync(
    // {force: true}
).then(function () {

});
export default db;
