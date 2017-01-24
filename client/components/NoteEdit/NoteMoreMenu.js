import React from 'react';
import LabelsDropDown from './LabelsDropDown';

class NoteMoreMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }
    render() {
        return (
            <div >
                {this.state.page == 1 &&
                <div>
                    <div onClick={()=>this.setState({page:2})}> Ярлыки</div>
                    <div onClick={this.props.onClickDelete}> Удалить заметку</div>
                    <div onClick={this.props.onClickCopy}> Создать копию</div>
                </div>
                }
                {this.state.page == 2 &&
                <LabelsDropDown
                    onCreateLabel={this.props.onCreateLabel}
                    labels={this.props.labels}
                    onChangeChecked={this.props.onChangeLabels}
                    checkedLabels={this.props.checkedLabels}
                />}
            </div>
        );
    }
}

export default NoteMoreMenu;
