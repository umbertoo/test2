import React from 'react';
import LabelsList from "./NoteEdit/LabelsList";

const Note = ({text, title, labels, color})=>(
    <div style={{backgroundColor: color || '#fafafa'}}
        className="note_block_body">
        <div className="note_content">
            <div className="note_title">{title}</div>
            <div className="note_text">{text}</div>
        </div>
        <LabelsList labels={labels}/>
    </div>
);
// Note.defaultProps={
//     text:'', title:'', labels:[], color:'#fafafa'
// };
export default Note
