import {type} from '../actions/common/types';
import assign from 'lodash/object/assign'
import omit from 'lodash/object/omit'
import merge from 'lodash/object/merge'


const initialState = {
    items: [],
    isFetching: false
};

export const labels = (state = initialState, action) => {
    switch (action.type) {

        case type.FETCH_NOTES_SUCCESS:


            return  merge({},state,{ items: action.payload.entities.labels});
        
        case type.FETCH_LABELS_REQUEST:
            return {...state, isFetching: action.isFetching};
        case type.FETCH_LABELS_FAILURE:
            return {...state, isFetching: action.isFetching};
        case type.FETCH_LABELS_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                items: action.payload.entities.labels,
                itemsIds: action.payload.result
            };


        case type.DELETE_LABEL:
            return {...state, items: omit(state.items, action.id), itemsIds: state.itemsIds.filter(id=>id !== action.id)};

        
        
        case type.DELETE_LABELS_REQUEST:
            return {...state, LabelisFetching: action.LabelisFetching};
        case type.DELETE_LABELS_FAILURE:
            return {...state, LabelisFetching: action.LabelisFetching};
        case type.DELETE_LABELS_SUCCESS:
            return {...state, LabelisFetching: action.LabelisFetching};


        case type.UPDATE_LABEL:
            return {...state, items: {...state.items, [action.label.id]: {...state.items[action.label.id],...action.label}}};

        case type.UPDATE_LABELS_REQUEST:
            return {...state, LabelisFetching: action.LabelisFetching};
        case type.UPDATE_LABELS_FAILURE:
            return {...state, LabelisFetching: action.LabelisFetching};
        case type.UPDATE_LABELS_SUCCESS:
            return {...state, LabelisFetching: action.LabelisFetching};

        case type.ADD_LABEL:
            // console.log({[action.label.id]:action.label, ...state.items})
            //             console.log(assign({},state.items,{[41]:action.label, ...state.items}));

            return {...state,
                items: {[action.label.id]:action.label, ...state.items},
             itemsIds: [action.label.id, ...state.itemsIds]};
        
        case type.CREATE_LABELS_SUCCESS:
            return {...state, isFetching: action.isFetching};


        default:
            return state;
    }
}


