import React, { Component } from 'react';
import {withRouter, hashHistory} from 'react-router';

class Comp extends Component {

    render(){
        console.error('Comp', this.props);
        return (<h1> Я</h1>); 
    }
}

export default withRouter(Comp);
