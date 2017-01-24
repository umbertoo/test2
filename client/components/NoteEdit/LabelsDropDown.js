import React from "react";
import MultiSelectList from "../MultiSelectList";
import forEach from 'lodash/collection/forEach';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';

class LabelsDropDown extends React.Component{
    constructor(props){
        super(props);
        this.state = {text: ''};
        this.onCreateLabel = this.onCreateLabel.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    onChangeInput(e){
        this.setState({text: e.target.value});
    }
    onCreateLabel(name){
        this.props.onCreateLabel({name:this.state.text});
        this.setState({text: ''});
    }
    render() {
        let { text } = this.state;
        let { labels } = this.props;

        let list = text ? filter(labels, e=> e.name.match(text)) : labels ;

        return (
            <div>
                <div>Добавить ярлык</div>

                <input onChange={this.onChangeInput}
                    type="text" value={text}
                    placeholder="Введите название ярлыка"/>

                <MultiSelectList
                    labels={list}
                    onChangeChecked={this.props.onChangeChecked}
                    checked={this.props.checkedLabels}/>

                {text && <button onClick={this.onCreateLabel}>+ Создать "{text}"</button>}
            </div>
        );
    }
}

export default LabelsDropDown;
