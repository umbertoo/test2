import React, {Component} from 'react';


const Modal = props =>{
    let { width, height } = this.props;
    let windowStyle = {
        height: height ? height + 'px' : 'auto',
        width,
        left: '50%',
        marginLeft: '-' + width / 2 + 'px',
        position: 'fixed'
    };
    return (
        <div >
            <div className="modal_overlay"
                onClick={e => {e.stopPropagation(); props.onOverlayClick();}}/>
            <div style={windowStyle}
                className="modal_window">
                <div className="modal_body">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
