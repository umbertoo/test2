import { type } from '../actions/common/types';
import { indexOf } from '../utils/index_of';
//

const initialState = {
    items: [],
    isFetching: false
};


export const colors = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_COLORS_FAILURE:
        case type.FETCH_COLORS_REQUEST:
            return Object.assign({}, state, {isFetching: action.isFetching});

        case type.FETCH_COLORS_SUCCESS:
            return Object.assign({}, state, {isFetching: action.isFetching, items: action.colors.entities.colors});

        default:
            return state;
    }
};
