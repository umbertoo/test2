import store from '../index'
import checkStatus from  './common/check_status_response'
// var storage = window.localStorage;
// storage.clear();
export * from './notes_actions';
export * from './labels_actions';
export * from './colors_actions';
export * from './page_actions';

export * from './common/types';




// export const type = {
//
// }
import React, { Component } from 'react';

class App extends Component {
    constructor(props){
        super(props);
        this.state={pos:0}
    }
    render(){
        return (<div>App</div>);
    }
}

export default App;
