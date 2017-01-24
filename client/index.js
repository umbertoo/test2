// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'

import './scss/style.scss';

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router,hashHistory,browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import routes from './routes';
const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app')
);
