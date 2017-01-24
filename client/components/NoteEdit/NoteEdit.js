import React from 'react';
import Textarea from 'react-textarea-autosize';
import autosize from 'autosize';
import forEach from 'lodash/collection/forEach';

import LabelsList from './LabelsList';
import NoteBar from './NoteBar';

class NoteEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.note};
        this.onChangeLabels = this.onChangeLabels.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.onChangeLabels = this.onChangeLabels.bind(this);
        this.onDeleteNote = this.onDeleteNote.bind(this);
        this.onCopyNote = this.onCopyNote.bind(this);
    }
    componentDidMount() {
        autosize(this.refs.txtInp);
        autosize(this.refs.titleInp);
    }
    clearNote() {
        this.setState({
            text: "", title: "", colorId: 1, labels: []
        });
    }
    handleSave(e) {
        if (e !== undefined) e.stopPropagation();
        let {text, title}=this.state;
        if (text != "" || title != "") {
            let payload = {...this.state};
            this.props.onSave(payload);
        }
    }
    onChangeLabels(labels) {
        this.setState({...this.state, labels}, this.onChange);
    }
    onChangeColor(color) {
        this.setState({colorId: color.id}, this.onChange);
    }
    onChangeText(e) {
        this.setState({text: e.target.value}, this.onChange);
    }
    onChangeTitle(e) {
        this.setState({title: e.target.value}, this.onChange);
    }
    onDeleteNote() {
        this.props.onDeleteNote({...this.state});
    }
    onCopyNote() {
        let {text, title, colorId, id, labels} = this.state;
        if (text != "" || title != "") {
            let payload = {text, title, colorId: colorId, id, labels: labels};
            this.props.onCopyNote(payload);
        }
    }
    onChange() {
        let { text, title, colorId, id, labels }=this.state;
        let note = { text, title, colorId: colorId, id, labels: labels };
        this.props.onChange(note);
    }
    render() {
        // console.log("RENDER NOTE_EDIT :", this.state.id);
        let {colors, labels} = this.props;
        let style;
        if (colors[this.state.colorId] && colors) style = {backgroundColor: colors[this.state.colorId].hex};
        let labelsList = this.state.labels.map(id => labels[id]);

        return (
            <div style={style} className={'clearfix note_edit_block'}>
                <textarea rows={1} ref="titleInp" className="titleInp "
                    onChange={this.onChangeTitle}
                    value={this.state.title}
                    placeholder="Введите заголовок"/>

                <textarea rows={1} ref="txtInp" className="txtInp" placeholder="Заметка"
                    onChange={this.onChangeText}
                    value={this.state.text}/>

                <LabelsList labels={labelsList}/>
                <div onClick={e=>e.stopPropagation()}>
                    <NoteBar
                        onDropDownOpen={this.props.onDropDownOpen}
                        onDropDownClose={this.props.onDropDownClose}

                        onClickDelete={this.onDeleteNote}
                        onClickCopy={this.onCopyNote}
                        dropDownIsOpen={this.props.dropDownIsOpen}
                        colors={this.props.colors}
                        labels={this.props.labels}

                        selectedColor={this.state.colorId}
                        checkedLabels={this.state.labels}

                        onCreateLabel={this.props.onCreateLabel}
                        onChangeLabels={this.onChangeLabels}
                        onChangeColor={this.onChangeColor}/>

                    {this.props.buttonSaveIsShow &&
                        <div className="btn btn-default btn_submit" onClick={this.handleSave}>
                            Готово
                        </div>
                    }
                </div>
            </div>
        );
    }
}
NoteEdit.defaultProps = {
    note: {text: "", title: "", colorId: 1, labels: []},
    buttonSaveIsShow: true
};

export default NoteEdit;
