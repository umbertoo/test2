import React from 'react';

const LoadingBlock = props => {
    let body = props.isFetching ? 'loading!!!!!!!!!!!!!!!!!!!!!!!!!' : props.children;
    return <div>{body}</div>;
};

LoadingBlock.defaultProps = {
    isFetching: true
};

export default LoadingBlock;
