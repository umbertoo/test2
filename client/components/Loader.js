import React from 'react';

const Loader = props => {
    let style =  !props.isFetching ? {display: "none"} : {display: "block"};
    return (
        <div style={style}>
            <img src="/img/loader.gif"/>
        </div>
    );
};

export default Loader;
