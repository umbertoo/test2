import React, { Component } from 'react';
import DropDown from '../DropDown';
import ColorPicker from '../ColorPicker';
import NoteMoreMenu from './NoteMoreMenu';
import LabelsDropDown from './LabelsDropDown';


class NoteBar extends Component{
    constructor(props){
        super(props);
        this.state={
            page: 1,
            moreMenuIsOpen:false
        };
        this.onDelete=this.onDelete.bind(this);
        this.onDropDownClose=this.onDropDownClose.bind(this);
        this.onCopy=this.onCopy.bind(this);
    }
    onDelete(){
        this.setState({
            page: 1,
            moreMenuIsOpen:false
        });
        this.props.onClickDelete();
    }
    onDropDownClose(){
        this.props.onDropDownClose();
        console.log("CLOSE DROPDOWN");
        this.setState({
            page: 1,
            moreMenuIsOpen:false
        });
    }
    onCopy(){
        this.setState({
            page: 1,
            moreMenuIsOpen:false
        });
        this.props.onClickCopy();

    }
    render() {

// console.log('Notebar RENDER')
        return (
            <div className="note_bar">
                <ColorPicker selectedColor={this.props.selectedColor} colors={this.props.colors}
                    onChangeColor={this.props.onChangeColor}/>

                <DropDown onOpen={this.props.onDropDownOpen} onClose={this.onDropDownClose} isOpen={this.state.moreMenuIsOpen}>

                    <div onClick={()=>this.setState({moreMenuIsOpen:true})} className="note_bar_btn more_btn"></div>
                    <div>
                        {this.state.page == 1 &&
                            <div>
                                <div onClick={()=>this.setState({page:2})}> Ярлыки</div>
                                <div onClick={this.onDelete}> Удалить заметку</div>
                                <div onClick={this.onCopy}> Создать копию</div>
                            </div>
                        }
                        {this.state.page == 2 &&
                            <LabelsDropDown
                                onCreateLabel={this.props.onCreateLabel}
                                labels={this.props.labels}
                                onChangeChecked={this.props.onChangeLabels}
                                checkedLabels={this.props.checkedLabels} />
                        }
                    </div>

                </DropDown>
            </div>
        );
    }
}

export default NoteBar;
