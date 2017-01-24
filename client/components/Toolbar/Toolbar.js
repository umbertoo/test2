import React, { Component } from 'react';
import Loader from '../Loader';
import Drawer from './Drawer';
import NavMenu from './NavMenu';
import Modal from '../LabelsModal/Modal';
import MultiActionBar from './MultiActionBar';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions/index";


class Toolbar extends Component {
    render() {
        console.log('Toolbar-render');
        let {selected_notes, title}=this.props;

        let toolbar_color = title == undefined ? '#ffbb00' : '#607d8b';
        title = selected_notes.length > 0 ? selected_notes.length : title;
        toolbar_color = selected_notes.length > 0 ? '#6f6f6f' : toolbar_color;

        let toolbar_class = selected_notes.length > 0 || title !== undefined ? "white_content" : '';

        return (

            <div onClick={e=>e.stopPropagation()} className={`toolbar ${toolbar_class}`}
                style={{backgroundColor:toolbar_color}}>
                <Drawer onDocumentClick={this.props.onDocumentClick} onOpen={this.props.onOpenDrawer}
                    isOpen={this.props.drawer_isOpen}>

                    <NavMenu
                        onMenuItemClick={this.props.onMenuItemClick}
                        onClickOpenLabelsModal={this.props.Actions.toggleLabelsModal}
                        selectedLabel={this.props.selectedLabel}

                        labels={this.props.labels}/>
                </Drawer>

                <div className="title">{title || "Заметки"}</div>

                {selected_notes.length > 0 &&
                    <div className="multi_action_bar">
                        <MultiActionBar colors={this.props.colors}
                            copyNotes={this.props.copyNotes}
                            changeNoteColor={this.props.changeNoteColor}
                            selected_notes={this.props.selected_notes}/>
                    </div>
                }
                <Loader isFetching={this.props.isFetching}/>
            </div>
        );
    }
}

export default Toolbar;
function mapStateToProps(state) {
    return {
        selected_notes: state.page.multi_action_selected_items,
        drawer_isOpen: state.page.drawer_isOpen,
        modal_labels_isOpen: state.page.modal_labels_isOpen
    };
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
