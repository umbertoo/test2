import { type } from '../actions/common/types';
import { indexOf } from '../utils/index_of';
//
import assign from 'lodash/object/assign';
import omit from 'lodash/object/omit';

import set from 'lodash/object/set';
import merge from 'lodash/object/merge';
import union from 'lodash/array/union';
import without from 'lodash/array/without';
// import { idsByLabel } from './idsBylabel';

const initialState = {
    idsByLabel: {}

};
export const pagination = (state = initialState, action) => {

        let labelsNames = action.labelsNames ? action.labelsNames : [action.labelname];
        let pages={};
        labelsNames.forEach(labelname => {
            pages[labelname] = idsByLabel(state.idsByLabel[labelname], action);
        });


        return { idsByLabel: {...state.idsByLabel, ...pages} };
        // let labelsNames = action.labelsNames ? action.labelsNames : [action.labelname];
        // let pages={};
        // // labelsNames.forEach(labelname => {
        // //     pages[labelname] = ;
        // // });
        //
        //
        // return { idsByLabel: {...state.idsByLabel, [labelname]:idsByLabel(state.idsByLabel[labelname], action)} };


};
const initState = {
    ids:[],
    pageCount:0,
    nextPageUrl:"",
    isFetching:false
};


const idsByLabel = (state = initState, action) => {
    switch (action.type) {
        case type.FETCH_NOTES_REQUEST:
        case type.FETCH_NOTES_FAILURE:
            return {
                ...state,
                isFetching:action.isFetching
            };

        case type.FETCH_NOTES_SUCCESS:
            return {...state,
                ids: union(state.ids, action.payload.result),
                pageCount:state.pageCount+1,
                nextPageUrl:action.nextPageUrl,
                isFetching:action.isFetching
            };
        case type.ADD_NOTE:
            return {...state, ids: [ action.note.id, ...state.ids ] };

        case type.DELETE_NOTE:
            return {...state, ids: without(state.ids, action.note.id) };

        case type.UPDATE_PAGINATION :
            if(action.deleted){
                return {...state, ids: without(state.ids, action.noteId) };
            }else if(action.added){
                return {...state, ids: [action.noteId,...state.ids] };
            }
        default:
            return state;
    }
};
