import { Schema, arrayOf, valuesOf } from 'normalizr';

const note = new Schema('notes');
 const color = new Schema('colors', { idAttribute: 'id' });
 const label = new Schema('labels', { idAttribute: 'id' });


note.define({
    color: color,
    labels: arrayOf(label)
});

// // Each comment has an author
// commentSchema.define({
//     author: commentAuthorSchema
// });

export const schemas = {
    note,color,label
};
