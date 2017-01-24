import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as Actions from "../actions";
import { withRouter , browserHistory, hashHistory} from "react-router";

import NotesList from "./../components/NotesList";
import Input from "./../components/Input";
import Toolbar from "../components/Toolbar/Toolbar";
import LoadingBlock from "./../components/LoadingBlock";
import SelectableArea from "../components/SelectableList/SelectableArea";
import LabelsModal from '../components/LabelsModal/LabelsModal';
import NotePage from "./../components/NotePage";


class App extends Component {
    constructor(props) {
        super(props);
        this.onChangeCountSelection = this.onChangeCountSelection.bind(this);
        this.handleOverlay = this.handleOverlay.bind(this);
        // this.props.fetchNotes(this.props.params.label_name);
        this.props.fetchLabels();
        this.props.fetchColors();
    }
    onChangeCountSelection(ids) {
        this.props.rectangleSelectNotes(ids);
    }

    handleOverlay() {
        this.props.input_visible && this.props.changeVisible(false);
    }
    render() {
        const {
            colorsisFetching, notesisFetching, labelsisFetching, colors,
            input_visible, labels, isFetching, note_page, notes_list, modal_labels_isOpen, labelsIds,
            changeNoteColor, copyNotes, changeVisible, addLabel, toggleDrawer,
            openDrawer, closeDrawer, toggleLabelsModal, deleteLabel, updateLabel
        } = this.props;
        let {label_name} = this.props.params;

        // console.log('app-render');
        return (
            <div className="overly" ref="overly" onClick={this.handleOverlay}>
                <div className="App">a
                    {modal_labels_isOpen &&
                        <LabelsModal labels={labels}
                            labelsIds={labelsIds}
                            toggleLabelsModal={toggleLabelsModal}
                            addLabel={addLabel}
                            deleteLabel={deleteLabel}
                            updateLabel={updateLabel} />
                    }
                    <LoadingBlock isFetching={notesisFetching  && colorsisFetching  && labelsisFetching}>
                        {note_page}
                    </LoadingBlock>
                    <div className="header">
                        <div className="header_top_block"></div>
                        <Toolbar
                            onMenuItemClick={closeDrawer}
                            onOpenDrawer={openDrawer}
                            onDocumentClick={closeDrawer}

                            colors={colors}
                            title={label_name}
                            changeNoteColor={changeNoteColor}
                            copyNotes={copyNotes}
                            openedLabel={this.props.params.label_name}

                            isFetching={isFetching}
                            labels={labels}
                            onMenuClick={toggleDrawer} />
                    </div>

                    <SelectableArea onChangeCountSelection={this.onChangeCountSelection}
                        onDuringSelection = {()=>{}}
                        onFinishSelection = {()=>{}} >
                        {/*<LoadingBlock isFetching={colorsisFetching  && labelsisFetching}></LoadingBlock>*/}


                        <div className="list_header" >
                            <Input />
                        </div>
                        {notes_list}
                        {//notes_list &&
                            //<LoadingBlock isFetching={colorsisFetching  && labelsisFetching}>    </LoadingBlock>


                        }
                    </SelectableArea>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) =>{
    // console.info('App mapStateToProps');
    return ({
        // selected_notes: state.page.multi_action_selected_items,
        // openedNote: state.page.openedNote,s
        modal_labels_isOpen: state.page.modal_labels_isOpen,

        colors: state.colors.items,
        labels: state.labels.items,
        labelsIds: state.labels.itemsIds,

        notesisFetching: state.notes.isFetching,
        labelsisFetching: state.colors.isFetching,
        colorsisFetching: state.labels.isFetching,

        input_visible: state.page.input_visible
        // target: state.page.opened_note_position

    });};
    export default withRouter(connect(mapStateToProps, Actions)(App));


    //
    //
    // import React, { Component } from 'react';
    //
    // class App extends Component {
    //     constructor(props){
    //         super(props);
    //         this.withProps= this.withProps.bind(this);
    //     }
    //     withProps(comp, props){
    //         if(!comp) return null;
    //         return React.cloneElement(this.props.children, props);
    //     }
    //     render(){
    //         const {client, login}=this.props;
    //         const {clientData, loginData}=this.state;
    //
    //         return (<div>
    //             {this.withProps(client,clientData)}
    //             {this.withProps(login,loginData)}
    //         </div>);
    //     }
    // }
    //
    // export default App;
