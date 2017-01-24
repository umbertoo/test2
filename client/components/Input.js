
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';


import NoteEdit from './NoteEdit/NoteEdit';
import find from 'lodash/collection/find';


class Input extends Component{
    constructor(props){
        super(props);
        this.state={
            note: {text: "", title: ""}
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleInputClick = this.handleInputClick.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isOpen && !this.props.isOpen) {
            let { note } = this.state;

            if (note !== undefined && (note.text != "" || note.title != "")) {
                this.props.addNote(note, this.props.params.label_name);

            }
            // this.refs.NoteEdit.clearNote();
        }
    }
    handleInputClick(e){
        e.stopPropagation();
        this.props.changeVisible(true);
    }
    handleCreate(payload){
        //вешаем сохранение на закрытие
        this.props.changeVisible(false);
    }
    render(){
        const {
            labels, colors, isOpen,
            addNote, addLabel,  changeVisible, params:{label_name=''}
        } = this.props;
        //  console.log('input-render')
        let { id } = find(labels,e=>e.name==label_name)||{};
        // console.log("");
        // console.log('label id: >>>',id);
        // console.log('');

        return (
            <div
                onClick={this.handleInputClick}
                className={'input_note clearfix open_' + isOpen}>
                {isOpen &&
                    <NoteEdit
                        note={{text: "", title: "", colorId: 1, labels: id?[id]:[]}}
                        onDropDownOpen={()=>{}}
                        onDropDownClose={()=>{}}
                        buttonSaveIsShow
                        ref="NoteEdit"
                        colors={colors}
                        labels={labels}
                        onCreateLabel={addLabel}
                        onSave={this.handleCreate}
                        onChange={note=>this.setState({note})}/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        labels: state.labels.items,
        colors: state.colors.items,
        isOpen: state.page.input_visible
    };
};

export default withRouter(connect(mapStateToProps, actions)(Input));
