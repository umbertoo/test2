import React from 'react';
import ColorPicker from "../ColorPicker";
import DropDown from "../DropDown";

class MultiActionBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };
        this.onChangeColor = ::this.onChangeColor;
        this.onCopy = ::this.onCopy;

    }

    onCopy() {
       this.props.copyNotes(this.props.selected_notes);
    }

    onChangeColor(color) {
        this.props.changeNoteColor(color.id, this.props.selected_notes);
    }

    render() {
        return (
            <div className='note_bar'>
                <ColorPicker colors={this.props.colors} onChangeColor={this.onChangeColor}/>
                <DropDown onOpen={()=>{}} onClose={()=>{}} isOpen={false}>

                    <div onClick={()=>{}} className="note_bar_btn more_btn"></div>
                    <div>
                        {this.state.page == 1 &&
                        <div>
                            <div onClick={this.onCopy}> Создать копию</div>
                            <div onClick={()=>{}}> Ярлыки</div>
                            <div onClick={()=>{}}> Удалить заметку</div>

                        </div>
                        }
                        {this.state.page == 2 &&
                        <LabelsDropDown
                            onCreateLabel={this.props.onCreateLabel}
                            labels={this.props.labels}
                            onChangeChecked={this.props.onChangeLabels}
                            checkedLabels={this.props.checkedLabels}
                        />
                        }
                    </div>

                </DropDown>
            </div>
        );
    }
}

export default MultiActionBar;
