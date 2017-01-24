import { combineReducers } from 'redux';
import { notes } from './notes';
import { user } from './user';
import { page } from './page';
import { labels } from './labels';
import { colors } from './colors';
import { pagination } from './pagination';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';


export default combineReducers({
    notes,
    pagination,
    labels,
    colors,
    page,
    user

    // routing:routerReducer

});
