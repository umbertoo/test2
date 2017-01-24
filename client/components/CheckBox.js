import React, {Component} from 'react';

class CheckBox extends Component {
  constructor(props){
    super(props);
    this.state={
      isChecked: this.props.isChecked || false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isChecked !== this.props.isChecked) {
      this.setState({
        isChecked: nextProps.isChecked
      });
    }
  }
  toggleCheck(){
    this.props.onChangeChecked(!this.state.isChecked, this.props.value);
    this.setState({
      isChecked: !this.state.isChecked
    });
  }
  render() {
    let checkedClass = this.state.isChecked ? ' checked ' : '';
    return (
      <div className="checkbox_block" onClick={this.toggleCheck.bind(this)}>
        <div className={"checkbox_btn" +checkedClass} >
        </div>
        <span>{this.props.children}</span>
      </div>
    );
  }
}

export default CheckBox;
