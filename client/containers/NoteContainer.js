import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../actions/index";
import forEach from 'lodash/collection/forEach';
import shallowCompare from 'react-addons-shallow-compare';
import GetLabels from '../selectors/selectors';
import shallowEqual from 'shallowequal';
import isEqual from 'lodash/lang/isEqual';





import LabelsList from "../components/NoteEdit/LabelsList";
import NoteEdit from "../components/NoteEdit/NoteEdit";
import Note from "../components/Note";

class NoteContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            open: false
        };
        this.onDropDownOpen = this.onDropDownOpen.bind(this);
        this.onDropDownClose = this.onDropDownClose.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
         return !(this.props.isOpen == nextProps.isOpen && shallowEqual(this.state, nextState));
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.isOpen){
            window.pos = this.refs.noteblock;
        }
        if (JSON.stringify(this.props.note.labels) !== JSON.stringify(prevProps.note.labels)) {
            console.log('Note UPDATE');
            this.props.onUpdate();
        }
        if (this.state.edit) {
            setTimeout(()=> {
                if (!this.refs.noteblock.matches(':hover')) {
                    this.setState({
                        edit: false
                    });
                }
            }, 100);
        }
    }


    handleOpenNote(e, id) {
        this.setState({
            open: true
        });
        let {label_name} = this.props.params;

        if (label_name !== undefined) {
            this.props.router.push('/label/' + label_name + '/note/' + id);
        } else {
            this.props.router.push('note/' + id);
        }
    }
    onClick(e) {
        e.stopPropagation();
        let {id} = this.props;
        window.pos = this.refs.noteblock;
        this.handleOpenNote(e, id);
        this.setState({
            edit: false
        });
    }
    onDropDownOpen() {
        this.setState({
            freeze: true
        });
    }
    onDropDownClose() {
        this.setState({
            freeze: false
        });
    }
    onMouseLeave(event) {
        this.setState({
            edit: false
        });
    }
    onMouseMove() {
        if (!this.state.edit && this.refs.noteblock.matches(':hover')) {
            this.setState({
                edit: true
            });
        }
    }
    render() {
        let { colors, note, id, labels, isOpen, selectedLabels, noteColor,
            updateNote, addNote, deleteNote, addLabel
        } = this.props;
        console.log('note-render');
        return (
            <div
                onClick={this.onClick}
                onMouseMove={this.onMouseMove}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                ref="noteblock"

                className={"note_block wrap_note " + (isOpen? 'opened':'')} >
                {!this.state.edit && !this.state.freeze?
                    <Note color={noteColor}
                        title={note.title}
                        text={note.text}
                        labels={selectedLabels}/>
                            :<NoteEdit
                                onDropDownOpen={this.onDropDownOpen}
                                onDropDownClose={this.onDropDownClose}
                                onDeleteNote={deleteNote}
                                onCopyNote={addNote}
                                buttonSaveIsShow={false}
                                note={note}
                                colors={colors}
                                labels={labels}
                                onCreateLabel={addLabel}
                                onSave={()=>{}}
                                onChange={updateNote}/>
                }
            </div>
        );
    }
}

const mapStateToProps = () => {
    let getLabels = GetLabels();
    return (state, props) => {
        // console.log('mapStateToProps');
        let noteColor;
        let note = state.notes.items[props.id];
        if (state.colors.items[note.colorId] && note) {
            noteColor = state.colors.items[note.colorId].hex;
        }
        return {
            selectedLabels:getLabels(state, props),
            noteColor,
            note,
            isOpen:props.id==props.params.note_id,
            labels: state.labels.items,
            colors: state.colors.items,
        };
    };
};


export default withRouter(connect(mapStateToProps, actions)(NoteContainer));
