import React, { Component } from 'react';

class LabelItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            hover: false,
            edit: false,
            focus: false,
            show_save_btn: false,
            allow_hide_save_btn: false
        };

        this.onMouseLeaveSaveBtn=this.onMouseLeaveSaveBtn.bind(this);
        this.onMouseLeave=this.onMouseLeave.bind(this);
        this.onMouseEnter=this.onMouseEnter.bind(this);
        this.onFocus=this.onFocus.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onMouseEnterSaveBtn=this.onMouseEnterSaveBtn.bind(this);
        this.onMouseLeaveSaveBtn=this.onMouseLeaveSaveBtn.bind(this);
        this.onEditClick=this.onEditClick.bind(this);
        this.onSaveClick=this.onSaveClick.bind(this);
    }
    onChange(e) {
        this.setState({name: e.target.value});
    }
    onBlur(e) {
        console.log('ON BLUR');
        if (this.props.name !== e.target.value) {
            this.props.onChange(e.target.value, this.props.id);
        }
        if (!this.state.allow_hide_save_btn) {
            this.setState({
                edit: false,
                focus: false,
                show_save_btn: false
            });
        } else {
            this.setState({
                edit: false,
                focus: false
            });
        }
    }
    onMouseEnter() {
        this.setState({
            hover: true
        });
    }
    onMouseLeave() {
        this.setState({
            hover: false
        });
    }
    onFocus(e) {
        e.stopPropagation();
        console.log('ON FOCUS');

        this.setState({
            edit: true,
            focus: true,
            show_save_btn: true
        });

    }
    onEditClick(e) {
        e.stopPropagation();
        this.refs.edit_label_input.focus();
        console.log('onEditClick');
        this.setState({
            edit: true
        });
    }

    onSaveClick(e) {
        console.log('onSaveClick');
        e.stopPropagation();
        this.setState({
            edit: false,
            show_save_btn: false
        });
        if (this.props.name !== this.state.name) {
            this.props.onSave(this.state.name, this.props.id);
        }

    }
    onMouseLeaveSaveBtn() {
        this.setState({
            allow_hide_save_btn: false
        });
    }
    onMouseEnterSaveBtn() {
        this.setState({
            allow_hide_save_btn: true
        });
    }
    onMouseDown() {
        console.log('onMouseDown');
        this.refs.edit_label_input.focus();
    }
    render() {
        return (
            <div onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter}
                className="label_edit_item_block">

                {this.state.hover || this.state.edit ?
                    <div onClick={this.props.onDeleteLabel} className=" btn_edit_item remove_label"/>
                        :<div className=" btn_edit_item label_icon"/>
                }
                <input onMouseEnter={this.onMouseLeaveSaveBtn}
                    ref="edit_label_input" onFocus={this.onFocus} type="text" onBlur={this.onBlur}
                    onChange={this.onChange}
                    value={this.state.name}/>
                {this.state.show_save_btn ?
                    <div onMouseEnter={this.onMouseEnterSaveBtn}
                        onMouseLeave={this.onMouseLeaveSaveBtn}
                        onClick={this.onSaveClick}
                        className="btn_edit_item save_label"/>
                            :<div onClick={this.onEditClick} className=" btn_edit_item edit_label"/>
                }

            </div>
        );
    }
}

export default LabelItem;
