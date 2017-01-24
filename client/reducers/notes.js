import {type} from '../actions/common/types';

import union from 'lodash/array/union';

import assign from 'lodash/object/assign';
import omit from 'lodash/object/omit';

import set from 'lodash/object/set';
import merge from 'lodash/object/merge';
import filter from 'lodash/collection/filter';

import { idsByLabel } from './idsBylabel';


const initialState = {
    items: {},
    isFetching: true,
    NoteisFetching: false,
};

export const notes = (state = initialState, action) => {
    switch (action.type) {

        case type.FETCH_NOTES_REQUEST:
        case type.FETCH_NOTES_FAILURE:
            return {...state, isFetching: action.isFetching};

        case type.FETCH_NOTES_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                items: merge({},state.items, action.payload.entities.notes),
            };

        case type.FETCH_NOTE_REQUEST:
        case type.FETCH_NOTE_FAILURE:
            return {...state, isFetching: action.isFetching};
        case type.FETCH_NOTE_SUCCESS:
            if (state.items[action.note.id]) {
                return {...state, items: {...state.items, [action.note.id]: action.note}};
            } else {
                return {...state, isFetching: action.isFetching, buffer: {[action.note.id]: action.note}};
            }


        case type.CREATE_NOTES_SUCCESS:
            return {...state, isFetching: action.isFetching};

        case type.ADD_NOTE:
            return {
                ...state,
                items: {[action.note.id]: action.note, ...state.items}
            };
        case type.ADD_NOTES:
            return {
                ...state,
                items: { ...action.notes, ...state.items}
            };

        case type.DELETE_NOTE:
            return {
                ...state,
                items: omit(state.items, action.note.id)
            };
        case type.DELETE_NOTES_REQUEST:
        case type.DELETE_NOTES_FAILURE:
        case type.DELETE_NOTES_SUCCESS:
            return {...state, isFetching: action.isFetching};


        case type.CHANGE_NOTE_COLOR:
            let items = {...state.items};
            action.ids.forEach(id=> items[id].colorId = action.colorId);
            return {...state, items};

        case type.UPDATE_NOTE:
            return {...state, items: {...state.items, [action.note.id]: {...state.items[action.note.id],...action.note}}};

        case type.UPDATE_NOTES_REQUEST:
        case type.UPDATE_NOTES_FAILURE:
        case type.UPDATE_NOTES_SUCCESS:
            return {...state, NoteisFetching: action.NoteisFetching};

        default:
            return state;
    }
};
