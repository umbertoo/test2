import React, { Component } from "react";
import { connect } from "react-redux";
import Velocity from "velocity-animate";
import { withRouter } from "react-router";
import * as actions from "../actions";

import NoteEdit from "./NoteEdit/NoteEdit";


class NotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overlay_opacity: 0,
            transit_body_opacity: 0
        };

        this.handleOverlay=this.handleOverlay.bind(this);
        this.handleSave=this.handleSave.bind(this);
        this.onCopyNote=this.onCopyNote.bind(this);
        this.onDeleteNote=this.onDeleteNote.bind(this);
    }

    componentDidMount() {
        this.cb = this.props.router.listenBefore((loc,cb)=>{
            if(loc.pathname !== this.props.location.pathname){
                this.setState({
                    overlay_opacity: 0,
                    transit_body_opacity: 0,
                    opacity_speed:0.45
                });
                transit(window.pos, this.to,()=>{}, 200, 'close');
                setTimeout(()=>{this.cb(); cb();},200);
            }}
        );

        this.setState({
            overlay_opacity: 1,
            transit_body_opacity: 1,
            opacity_speed:0
        });
        if (this.props.notes.lenght <= 0) {
            this.props.fetchNote(this.props.params.note_id);
        }
        this.to = this.refs.transit_block;
        transit(window.pos,this.to,250);
    }
    closePage(){
        let { note_id, label_name } = this.props.params;
        this.setState({
            overlay_opacity: 0,
            transit_body_opacity: 0,
            opacity_speed:0.45
        });
        let path = label_name ? `/label/${label_name}` :``;
        this.props.router.push(path);
    }
    handleOverlay(e) {
        if (this.state.note) {
            this.props.updateNote(this.state.note);
        }
        this.closePage();
    }
    handleSave(payload) {
        this.props.updateNote(payload);
        this.closePage();
    }
    onDeleteNote(id) {
        this.props.deleteNote(id);
        this.closePage();
    }
    onCopyNote(payload) {
        this.props.addNote(payload);
    }
    render() {
        let {
            notes, labels, buffer, colors, openedNote, note, params,
            addLabel, deleteNote
        } = this.props;

        let { transit_body_opacity, opacity_speed } = this.state;

        if (buffer !== undefined && buffer[0].id == params.note_id) {
            note = buffer;
        }
        let style;

        if (note && colors[note.colorId]) style = { backgroundColor: colors[note.colorId].hex };

        return (
            <div className="note_page">

                <div ref="transit_block" className="transit_block" style={style}>
                    <div style={{ opacity:transit_body_opacity, transition:`all ${opacity_speed}s`}}
                        className="transit_block_body" >
                        <NoteEdit colors={colors}
                            onCreateLabel={addLabel}
                            labels={labels}
                            note={note}
                            buttonSaveIsShow
                            onDeleteNote={this.onDeleteNote}
                            onClopyNote={this.onCopyNote}
                            onSave={this.handleSave}
                            onChange={note=>this.setState({note})} />
                    </div>
                </div>
                <div className="overlay_notepage"
                    style={{opacity:this.state.overlay_opacity}}
                    onClick={this.handleOverlay} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) =>({
    colors: state.colors.items,
    labels: state.labels.items,
    buffer: state.notes.buffer,
    note: state.notes.items[ownProps.params.note_id],
    notes: state.notes.items,
    target: state.page.opened_note_position,
    openedNote: state.page.openedNote
});


export default withRouter(connect(mapStateToProps, actions)(NotePage));

const transit = (FROM_B, TO_B, callback = {}, speed = 200, event = "open") => {

    if (FROM_B !== undefined) {
        const FROM = FROM_B.getBoundingClientRect();
        const TO = TO_B.getBoundingClientRect();

        const px = "px";

        const scaleX = Math.abs(FROM_B.offsetWidth / TO_B.offsetWidth);
        const scaleY = Math.abs(FROM_B.offsetHeight / TO_B.offsetHeight);

        if (event === "open") {
            //------------on open---------------

            //start point
            Velocity(TO_B, {
                top: FROM.top,
                left: FROM.left,
                scaleX,
                scaleY,
                margin:0
            }, 0)
            //end point
            .then(e => Velocity(e,{
                top: TO.top,
                left: TO.left,
                scaleX:1,
                scaleY:1
            }, +speed, [0.075, 0.82, 0.165, 1]))
            .then(e => Object.assign(TO_B.style, {
                left: 'auto',
                top: '20%',
                width: 'auto',
                margin: '0 auto',
            }));
        } else {
            //------------on close---------------
            //start point
            Object.assign(TO_B.style, {
                top: TO.top + px,
                left: TO.left + px,
                margin: 0,
                'min-height': 0+px
            });
            //end point
            Velocity(TO_B, {
                top: FROM.top,
                left: FROM.left,
                scaleX,
                scaleY,
                boxShadowBlur: 2+px
            }, speed
// [0.86, 0, 0.07, 1]
        );
        }
    } else {
        console.error('невижу opened');
        // callback();
    }

};
