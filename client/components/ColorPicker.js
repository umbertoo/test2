import React, {Component} from 'react';
import forEach from 'lodash/collection/forEach';
import map from 'lodash/collection/map';

var colors = [
    {name: "white", hex: "#fafafa", id: 1},
    {name: "red", hex: "#FF8A80", id: 2},
    {name: "orange", hex: "#FFD180", id: 3},
    {name: "yellow", hex: "#FFFF8D", id: 4},
    {name: "grey", hex: "#CFD8DC", id: 5},
    {name: "blue", hex: "#80D8FF", id: 6},
    {name: "turquoise", hex: "#A7FFEB", id: 7},
    {name: "green", hex: "#CCFF90", id: 8}

];
class ColorPicker extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedColor: this.props.selectedColor
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedColor !== this.props.selectedColor) {
            this.setState({
                selectedColor: nextProps.selectedColor
            });
        }
    }
    handleSelect(color, e){
        this.setState({selectedColor: color.id});
        this.props.onChangeColor(color);
    }
    render(){
        let colorList = map(this.props.colors, color=> {
            let selectClass = color.id == this.state.selectedColor ? 'selected' : '';
            return(
                <div onClick={this.handleSelect.bind(this, color)}
                  className={"color_btn "+selectClass}
                  style={{backgroundColor: color.hex}}
                  key={color.id}/>
                );
        });
        return (
            <div className="color_picker">
              <div className={'select_color open'}>
                {colorList}
              </div>
              <div className="btn_color_picker"/>
            </div>
        );
    }
}

export default ColorPicker;
