import React, { Component } from "react";
import CheckBox from './../components/CheckBox';
import forEach from 'lodash/collection/forEach';
import map from 'lodash/collection/map';
class LabelsSelect extends Component{
    constructor(props){
        super(props);
        this.state={
            checked: this.props.checked
        };
        this.handleMouseEnter=this.handleMouseEnter.bind(this);
        this.handleMouseLeave=this.handleMouseLeave.bind(this);
        this.handleCheck=this.handleCheck.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.checked) !== JSON.stringify(this.state.checked)){
            this.setState({
                checked: nextProps.checked
            });
        }
    }
    handleMouseEnter(e){
        this._pos = document.body.scrollTop;
        window.onscroll = () => window.scrollTo(0, this._pos);
    }
    handleMouseLeave(e){
        window.onscroll = '';
    }
    handleCheck(isChecked, value){
        let checked = [];

        if (!isChecked) {
            checked = this.state.checked.filter(e => e != value);
        } else {
            checked = [...this.state.checked,value];
        }
        this.setState({checked});
        this.props.onChangeChecked(checked);
    }
    render() {

        let {labels} = this.props;
        let checkedList = this.state.checked || [];

        const list = map(labels,label=> {
            let isChecked = checkedList.some(e=>e==label.id);
            return (
                <CheckBox key={label.id} isChecked={isChecked} onChangeChecked={this.handleCheck} value={label.id}>
                    {label.name}
                </CheckBox>
            );
        });
        return (
            <div
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                ref="list" className="checkbox_list">
                {list}
            </div>
        );
    }
}

export default LabelsSelect;
