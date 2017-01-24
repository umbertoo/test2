import React from 'react';
import {Link} from 'react-router';
import map from 'lodash/collection/map';


const LabelsList = ({labels})=> {
    let list = map(labels, label=>
        <span onClick={e=>e.stopPropagation()} className="label_block" key={label.id}>
            <Link onClick={e=>e.stopPropagation()} to={`/label/`+label.name}>
                {label.name}
            </Link>
        </span>
    );
    return (
        <div className="labels_list">  {list} </div>
    );

};

export default LabelsList;
