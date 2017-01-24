import checkStatus from  './common/check_status_response'
import {type} from './common/types';

//Labels Modal
export const toggleLabelsModal = () =>({
    type: type.TOGGLE_LABELS_MODAL
});


//Notes Selecting
export const toggleSelectNote = (id) =>({
    type: type.TOGGLE_SELECT_NOTE,
    id
});
export function rectangleSelectNotes(id) {
    return ({
        type: type.RECTANGLE_SELECT_NOTES,
        id
    })

}
export function clearSelectedNodes() {
    return ({
        type: type.CLEAR_SELECTED_NOTES

    })

}


//Note Position
export function setNotePosition(target) {
    return {
        type: type.SET_NOTE_POSITION,
        target: {
            left: target.left, top: target.top,
            width: target.width, height: target.height
        }
    };
}


//Input visibility
export function changeVisible(visibility) {
    return (dispatch, getState) => {
        // if (getState().page.input_visible !== visibility) {
        dispatch({
                type: type.INPUT_VISIBLE,
                visibility
            }
        )
        // }
    }
}


//Drawer 
export function toggleDrawer() {
    return {
        type: type.TOGGLE_DRAWER
    };

}
export function closeDrawer() {
    console.log("closeDrawer")
    return {
        type: type.CLOSE_DRAWER
    };

}
export function openDrawer() {
    console.log("openDrawer")
    return {
        type: type.OPEN_DRAWER
    };

}


