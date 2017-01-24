import React from 'react';
import Tether from 'react-tether';

class DropDown extends React.Component {
    constructor(props){
        super(props);
        this.handleClickDocument = this.handleClickDocument.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClickDropBlock = this.handleClickDropBlock.bind(this);
        this.state={
            isOpen: false,
            selfClick: false
        };
    }
    componentDidMount() {
        document.addEventListener("click", this.handleClickDocument);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen: nextProps.isOpen
        });
    }
    componentWillUpdate(nextProps, nextState) {
        if(nextState.isOpen!==this.state.isOpen && !nextState.isOpen) this.props.onClose();
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickDocument);

    }

    handleClickDocument(){
        // console.log('handleClickDocument');
        if (!this.state.selfClick) {
            this.setState({
                isOpen: false
            });
        }
    }

    close(){
        this.setState({
            isOpen: false
        });
    }
    handleOpen(e){
        this.props.onOpen();
        this.setState({
            isOpen: !this.state.isOpen,
            selfClick: true
        });

        setTimeout(()=>this.setState({selfClick: false}),100);

    }
    handleClickDropBlock(){
        this.setState({
            selfClick: true
        });
        setTimeout(()=>this.setState({selfClick: false}),100);
    }
    render() {
        let openClass = this.state.isOpen ? 'open' : '';

        return (

            <div ref="wrapper" className={"drop_comp drop_wrapper "+openClass}>
                <Tether className="tether_drop" attachment="top left" targetAttachment="bottom left">
                    <div className="btn_drop" onClick={this.handleOpen}>
                        {this.props.children[0]}
                    </div>
                    {this.state.isOpen &&

                        <div ref="drop_block" className={"drop_block "+openClass} onClick={this.handleClickDropBlock}>
                            {this.props.children[1]}
                        </div>

                    }
                </Tether>
            </div>
        );
    }
}
DropDown.defaultProps = {
    onClose:()=>{},
    onOpen:()=>{}
};
export default DropDown;
