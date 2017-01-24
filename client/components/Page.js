import React, { Component } from 'react';
import Comp from './Comp';

class Page extends Component {

    render(){

        console.error("Я тут!!!!!!!!",this.props);
        return (<div><Comp/>Page</div>);
    }
}

export default Page;
