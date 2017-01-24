import React from 'react';
import NavMenu from './NavMenu'

class Drawer extends React.Component{
    constructor(props){
        super(props);
        this.state = { isOpen: false,
            selfClick: false}

    }
    componentWillReceiveProps(nextProps) {
        if (this.state.isOpen !== nextProps.isOpen) {
            this.setState({
                isOpen: nextProps.isOpen,
                selfClick: true
            });
        }
    }
    handleClickDocument(){
        if (this.state.selfClick==false && this.state.isOpen) {
            this.setState({
                isOpen: false
            });
            this.props.onDocumentClick()
        }
    }
    handleOpen(e){
        this.setState({
            isOpen: !this.state.isOpen,
            selfClick: true
        });

        if(!this.state.isOpen)  {
            this.props.onOpen();

        }
        setTimeout(()=>this.setState({selfClick: false}), 100)
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickDocument.bind(this));

    }
    componentDidMount() {
        document.addEventListener("click", this.handleClickDocument.bind(this));
     
    }
    handleDrawerClick(e){
        // e.stopPropagation();
        this.setState({selfClick: true});
        setTimeout(()=>this.setState({selfClick: false}),100)
    }
    render() {
        return (
            <div onClick={this.handleDrawerClick.bind(this)} className={"drawer "+ (this.state.isOpen ? 'isopen' : 'isclose')}>
                <div className="menu_btn" onClick={this.handleOpen.bind(this)}></div>
                <div className="drawer_body">
                    {this.state.isOpen && this.props.children}
                </div>
            </div>
        );
    }
}

export default Drawer;
