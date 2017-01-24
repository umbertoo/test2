import React from 'react';
import LabelItem from './LabelItem';

import findIndex from 'lodash/array/findIndex';
import forEach from 'lodash/collection/forEach';
import map from 'lodash/collection/map';

class LabelsEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: this.props.labels,
            add_label_value: '',
            btn_add_isShow: false
        };
        this.clearAddLabelInput=this.clearAddLabelInput.bind(this);
        this.onFocusAddLabelInput=this.onFocusAddLabelInput.bind(this);
        this.onAddLabel=this.onAddLabel.bind(this);
        this.onClickList=this.onClickList.bind(this);
        this.onClickPlus=this.onClickPlus.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    onDeleteLabel(id) {
        console.log('id', id);
        this.props.onDeleteLabel(id);
    }
    onChange(name, id) {
        console.log('changeLabel', this.state.labels);
        this.props.onUpdateLabel({name, id});
    }
    onChangeValueInAddLabel(e) {
        console.log('onChangeValueInAddLabel');
        this.setState({
            add_label_value: e.target.value
        });

    }
    onAddLabel() {
        console.log('onAddLabel');
        let {value}=this.refs.add_label_input;
        if (value !== '') {
            this.props.onAddLabel(value);
            this.clearAddLabelInput();
        }
    }
    onFocusAddLabelInput() {
        this.setState({
            btn_add_isShow: true
        });

    }
    clearAddLabelInput() {
        this.setState({
            add_label_value: '',
            btn_add_isShow: false
        });
    }
    onClickPlus() {
        this.setState({
            btn_add_isShow: true
        });

        this.refs.add_label_input.focus();
    }
    onClickList() {
        this.setState({
            btn_add_isShow: false
        });

    }
    render() {

        let list = map(this.props.labels, label=>
            <LabelItem
                onSave={this.onChange}
                onDeleteLabel={this.onDeleteLabel.bind(this, label.id)}
                onChange={this.onChange} key={label.id} id={label.id} name={label.name}/>
        );

        return (
            <div className="edit_label_list">
                <div className="edit_label_list_scroll">
                    <span>Изменение ярлыков</span>

                    <div className="input_label_block">

                        {this.state.btn_add_isShow ?
                            <div onClick={this.clearAddLabelInput}
                                className="btn_inp clear_input_btn"/>
                                    :<div onClick={this.onClickPlus} className="btn_inp plus_input_btn" />
                        }
                        <input
                            placeholder="Создать ярлык"
                            onFocus={this.onFocusAddLabelInput} ref="add_label_input" type="text"
                            onChange={this.onChangeValueInAddLabel}
                            value={this.state.add_label_value}/>

                        {this.state.btn_add_isShow &&
                            <div onClick={this.onAddLabel} className="btn_inp create_label_btn"></div>
                        }
                    </div>
                    <div onClick={this.onClickList} className="edit_label_list_body">
                        {list}
                    </div>
                </div>
                <div className="edit_label_list_bar">
                    <div className="btn">Готово</div>
                </div>
            </div>
        );
    }
}

export default LabelsEdit;
