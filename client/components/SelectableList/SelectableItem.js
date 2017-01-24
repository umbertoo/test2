import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SelectableItem extends Component{
    constructor(props){
        super(props);
        this.state={selected: false};
    }

    componentDidMount() {
        // console.log(this.props.selectableKey, this);
        this.context.selectable.register(this.props.selectableKey, this);
    }
    componentWillUnmount() {
        this.context.selectable.unregister(this.props.selectableKey);
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //   if (nextState.selected == this.state.selected) {
    //       return false
    //   }else{
    //       return true
    //   }
    // },
    toggleSelect(e){
        e.stopPropagation();
        this.setState({
            selected: !this.state.selected
        });
        this.context.selectable.toggleSelect(this.props.selectableKey);
        console.log('toggleSelect');

    }
    render() {
        return (
            <div className={'selectable_item '+ (this.state.selected ? 'selected':'')}  >
                <div onClick={this.toggleSelect.bind(this)}
                    className="select_note_btn">
                    <div className="icon_select"></div>
                </div>
                {this.props.children}

            </div>
        );
    }
}
SelectableItem.contextTypes= {
    selectable: React.PropTypes.object
};

export default SelectableItem;
