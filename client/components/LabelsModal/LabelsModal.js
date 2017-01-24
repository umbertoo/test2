import React from 'react';
import Modal from './Modal';
import LabelsEdit from './LabelsEdit';

const LabelsModal = props =>{
        return (
            <Modal onOverlayClick={props.toggleLabelsModal} width={300} >
                <LabelsEdit labels={props.labels}
                    onAddLabel={props.addLabel}
                    onDeleteLabel={props.deleteLabel}
                    onUpdateLabel={props.updateLabel}/>

            </Modal>
        );

};

export default LabelsModal;
