import Sequelize from 'sequelize';
import Note from './Note';
import db from '../db';

const Color = db.define('color', {
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    hex: {
        type: Sequelize.STRING,
         allowNull: false
    }
});
// Note.hasMany(Label, {as: 'Labels'});
// User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId' })
// Project.belongsToMany(User, { as: 'Workers', through: 'worker_tasks', foreignKey: 'projectId' })

Note.belongsTo(Color,{as: 'color'});
Color.hasMany(Note, { foreignKey: { allowNull: false }});

db.sync(
    // {force: true}
);
Color.sync(
    // {force: true}
).then(function () {
    // return(Color.create({
    //   name: 'white',
    //   hex: '#fafafa'
    // }))
});
export default Color;
