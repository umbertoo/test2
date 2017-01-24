import {type} from '../actions/common/types';
import {indexOf} from '../utils/index_of';

const initialState = {
    input_visible: false,
    drawer_isOpen: false,
    modal_labels_isOpen: false,

    openedNote: "",
    opened_note_position: {},

    multi_action_selected_items: []

};
export const page = (state = initialState, action)=> {

    switch (action.type) {

        case type.INPUT_VISIBLE:
            return Object.assign({}, state, {input_visible: action.visibility});

        case type.TOGGLE_DRAWER:
            return Object.assign({}, state, {drawer_isOpen: !state.drawer_isOpen});

        case type.TOGGLE_LABELS_MODAL:
            return Object.assign({}, state, {modal_labels_isOpen: !state.modal_labels_isOpen});

        case type.CLOSE_DRAWER:
            return Object.assign({}, state, {drawer_isOpen: false});
        case type.OPEN_DRAWER:
            return Object.assign({}, state, {drawer_isOpen: true});

        case type.SET_NOTE_POSITION:
            return Object.assign({}, state, {opened_note_position: action.target});

        case type.OPEN_NOTE:
            return Object.assign({}, state, {openedNote: action.openedNote});


        case type.CLEAR_SELECTED_NOTES:
            return {...state ,multi_action_selected_items: []};

        case type.RECTANGLE_SELECT_NOTES:
            return {...state ,multi_action_selected_items: action.id };


        case type.TOGGLE_SELECT_NOTE:
            let {id}= action;
            var index = indexOf(id, state.multi_action_selected_items);
            if (index > -1) {
                let items = state.multi_action_selected_items.slice();
                items.splice(index, 1);
                return Object.assign({}, state, {multi_action_selected_items: [...items]});
            } else {
                console.log("добавляем");
                return Object.assign({}, state, {multi_action_selected_items: [...state.multi_action_selected_items, {id}]});

            }
        // return Object.assign({}, state,{multi_action_selected_items:[{id:180},{id:181},{id:182},{id}]});
        default:
            return state;
    }
};
