
import Sequelize from 'sequelize';
import Label from './Label';
import db from '../db';


const Note = db.define('note', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING
    }
    // color: {
    //     type: Sequelize.STRING
    // }
});
// Note.hasMany(Label, {as: 'Labels'});
// User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId' })
// Project.belongsToMany(User, { as: 'Workers', through: 'worker_tasks', foreignKey: 'projectId' })

Note.belongsToMany(Label, {through: 'note_labels'});
Label.belongsToMany(Note, {through: 'note_labels'});
// app.db.sync(  );
Note.sync(
    // {force: true}
).then(function () {
    // return(Note.create({
    //   text: 'John',
    //   color: '#fff'
    // }))
});
export default Note;
